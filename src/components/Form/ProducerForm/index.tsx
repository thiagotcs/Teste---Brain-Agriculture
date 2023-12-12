import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Input from '../Input'
import { Button } from '../../Button'
import { api } from '../../../services/api'
import { ErrorMessage } from '../Input/ErrorMessage'
import { isValidCpfOrCnpj, formatCpfOrCnpj } from '../../../utils/utils'

const cpfOrCnpjSchema = z.string().refine((value) => isValidCpfOrCnpj(value), {
  message: 'CPF/CNPJ inválido',
})

export const producerFormSchema = z
  .object({
    producerName: z
      .string()
      .min(3, { message: 'Nome do produtor deve ter pelo menos 3 caracteres' }),
    cpfOrCnpj: cpfOrCnpjSchema,
    farmName: z
      .string()
      .min(3, { message: 'Nome da fazenda deve ter pelo menos 3 caracteres' }),
    city: z
      .string()
      .min(3, { message: 'Nome da cidade deve ter pelo menos 3 caracteres' }),
    state: z.string().length(2, { message: 'O estado deve ter 2 caracteres' }),
    totalArea: z.number(),
    agriculturalArea: z.number(),
    vegetationArea: z.number(),
    crops: z.string().refine(
      (crop) => {
        const validCrops = [
          'Soja',
          'Milho',
          'Algodão',
          'Café',
          'Cana de Açúcar',
        ]
        return validCrops.includes(crop)
      },
      {
        message:
          'Por favor, insira uma cultura válida (Soja, Milho, Algodão, Café, Cana de Açúcar)',
      },
    ),
  })
  .refine(
    (data) => {
      return data.agriculturalArea + data.vegetationArea <= data.totalArea
    },
    {
      message:
        'A soma da área agrícola e de vegetação não deve ser maior que a área total da fazenda',
    },
  )

export type NewProducerFormInputs = z.infer<typeof producerFormSchema>

export function ProducerForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<NewProducerFormInputs>({
    resolver: zodResolver(producerFormSchema),
  })

  const watchTotalArea = watch('totalArea') || 0
  const watchAgriculturalArea = watch('agriculturalArea') || 0
  const watchVegetationArea = watch('vegetationArea') || 0

  const isValidArea = (
    agriculturalArea: number | undefined,
    vegetationArea: number | undefined,
    totalArea: number | undefined,
  ): boolean => {
    const validAgriculturalArea = agriculturalArea || 0
    const validVegetationArea = vegetationArea || 0
    const validTotalArea = totalArea || 0

    return validAgriculturalArea + validVegetationArea <= validTotalArea
  }
  useEffect(() => {
    const isValid = isValidArea(
      watchAgriculturalArea,
      watchVegetationArea,
      watchTotalArea,
    )

    if (!isValid) {
      setError('agriculturalArea', {
        type: 'manual',
        message:
          'A soma da área agrícola e de vegetação não deve ser maior que a área total da fazenda',
      })
      setError('vegetationArea', {
        type: 'manual',
        message:
          'A soma da área agrícola e de vegetação não deve ser maior que a área total da fazenda',
      })
    } else {
      clearErrors('agriculturalArea')
      clearErrors('vegetationArea')
    }
  }, [
    watchTotalArea,
    clearErrors,
    watchAgriculturalArea,
    watchVegetationArea,
    setError,
  ])
  const handleSaveProducer = async (data: NewProducerFormInputs) => {
    try {
      if (id) {
        await api.put(`producers/${id}`, data)
        alert('Produtor editado com sucesso.')
      } else {
        await api.post('producers', data)
        alert('Produtor cadastrado com sucesso.')
      }

      reset()
    } catch (error) {
      console.error('Erro ao salvar o produtor:', error)
    }
  }
  const fetchProducerData = async () => {
    try {
      if (id) {
        const response = await api.get(`producers/${id}`)
        const producerData = response.data

        setValue('producerName', producerData.producerName)
        setValue('cpfOrCnpj', producerData.cpfOrCnpj)
        setValue('farmName', producerData.farmName)
        setValue('city', producerData.city)
        setValue('state', producerData.state)
        setValue('crops', producerData.crops)
        setValue('totalArea', producerData.totalArea)
        setValue('agriculturalArea', producerData.agriculturalArea)
        setValue('vegetationArea', producerData.vegetationArea)
      }
    } catch (error) {
      console.error('Erro ao buscar dados do produtor:', error)
    }
  }

  useEffect(() => {
    fetchProducerData()
  }, [id])

  const handleCancel = () => (!id ? reset() : navigate('/producer'))

  return (
    <div className="mt-6 flex flex-col ">
      <div className="flex flex-col justify-between gap-4 border-b border-zinc-200 pb-5 lg:flex-row lg:items-center">
        <div className="space-y-1">
          <h2 className="text-lg font-medium text-zinc-900">
            Informação pessoal
          </h2>
          <span className="text-sm text-zinc-500">
            Atualize seus dados pessoais aqui.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" form="settings">
            Save
          </Button>
        </div>
      </div>
      <ErrorMessage
        error={
          errors?.agriculturalArea?.message ||
          (errors?.isSubmitted && 'Campo obrigatório') ||
          ''
        }
      />
      <form
        id="settings"
        className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-200"
        onSubmit={handleSubmit(handleSaveProducer)}
      >
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form">
          <label
            htmlFor="producerName"
            className="text-sm font-medium text-zinc-700"
          >
            Nome do produtor
          </label>
          <div className="flex flex-1 flex-col gap-1">
            <Input.Root>
              <Input.Control
                id="producerName"
                placeholder="Nome"
                required
                {...register('producerName')}
              />
            </Input.Root>
            <ErrorMessage error={errors.producerName?.message} />
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-form">
          <label
            htmlFor="cpfOrCnpj"
            className="text-sm font-medium text-zinc-700"
          >
            CPF/CNPJ
          </label>
          <div className="flex flex-1 flex-col gap-1">
            <Input.Root>
              <Input.Control
                placeholder="CPF (123.456.789-09) ou CNPJ (12.345.678/0001-01)"
                required
                {...register('cpfOrCnpj', {
                  onChange: (e) => {
                    const value = e.target.value
                    const formattedValue = formatCpfOrCnpj(value)
                    setValue('cpfOrCnpj', formattedValue)
                  },
                })}
              />
            </Input.Root>
            <ErrorMessage error={errors.cpfOrCnpj?.message} />
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-form">
          <label
            htmlFor="farmName"
            className="text-sm font-medium text-zinc-700"
          >
            Nome da Fazenda
          </label>
          <div className="flex flex-1 flex-col gap-1">
            <Input.Root>
              <Input.Control
                id="farmName"
                placeholder="Nome da Fazenda"
                required
                {...register('farmName')}
              />
            </Input.Root>
            <ErrorMessage error={errors.farmName?.message} />
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-form">
          <label htmlFor="city" className="text-sm font-medium text-zinc-700">
            Cidade / Estado
          </label>
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2">
            <div className="flex flex-1 flex-col gap-1">
              <Input.Root>
                <Input.Control
                  id="city"
                  placeholder="Cidade"
                  required
                  {...register('city')}
                />
              </Input.Root>
              <ErrorMessage error={errors.city?.message} />
            </div>
            <div className="flex flex-col gap-3 lg:block">
              <Input.Root>
                <Input.Control
                  id="estado"
                  placeholder="Estado"
                  required
                  {...register('state')}
                />
              </Input.Root>
              <ErrorMessage error={errors.state?.message} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-form">
          <label htmlFor="crops" className="text-sm font-medium text-zinc-700">
            Culturas plantadas (Soja, Milho, Algodão, Café, Cana de Açucar)
          </label>
          <div className="flex flex-1 flex-col gap-1">
            <Input.Root>
              <Input.Control
                id="crops"
                placeholder="Culturas plantadas (Soja, Milho, Algodão, Café, Cana de Açucar)"
                required
                {...register('crops')}
              />
            </Input.Root>
            <ErrorMessage error={errors.crops?.message} />
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-form">
          <label
            htmlFor="totalArea"
            className="text-sm font-medium text-zinc-700"
          >
            Área total em hectares da fazenda
          </label>
          <div className="flex flex-1 flex-col gap-1">
            <Input.Root>
              <Input.Control
                id="totalArea"
                placeholder="Área total em hectares da fazenda"
                required
                {...register('totalArea', { valueAsNumber: true })}
              />
            </Input.Root>
            <ErrorMessage error={errors.totalArea?.message} />
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-form">
          <label
            htmlFor="agriculturalArea"
            className="text-sm font-medium text-zinc-700"
          >
            Área agricultável em hectares
          </label>
          <div className="flex flex-1 flex-col gap-1">
            <Input.Root>
              <Input.Control
                id="agriculturalArea"
                placeholder="Área agricultável em hectares"
                required
                {...register('agriculturalArea', { valueAsNumber: true })}
              />
            </Input.Root>
            <ErrorMessage error={errors.agriculturalArea?.message} />
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-form">
          <label
            htmlFor="vegetationArea"
            className="text-sm font-medium text-zinc-700"
          >
            Área de vegetação em hectares
          </label>
          <div className="flex flex-1 flex-col gap-1">
            <Input.Root>
              <Input.Control
                id="vegetationArea"
                placeholder="Área de vegetação em hectares"
                required
                {...register('vegetationArea', { valueAsNumber: true })}
              />
            </Input.Root>
            <ErrorMessage error={errors.vegetationArea?.message} />
          </div>
        </div>
      </form>
    </div>
  )
}
