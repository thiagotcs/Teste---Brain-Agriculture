import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import * as Input from '../Input'
import { Button } from '../../Button'
import { api } from '../../../services/api'
import { ErrorMessage } from '../Input/ErrorMessage'

const isValidCpfOrCnpj = (value: string): boolean => {
  const cpfRegex = /^\d{11}$/
  const cnpjRegex = /^\d{14}$/

  return cpfRegex.test(value) || cnpjRegex.test(value)
}
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
    totalArea: z
      .number()
      .refine((value) => isValidNumber(value) && value >= 0, {
        message: 'A área total deve ser um número não negativo',
      }),
    agriculturalArea: z
      .number()
      .refine((value) => isValidNumber(value) && value >= 0, {
        message: 'A área agrícola deve ser um número não negativo',
      }),
    vegetationArea: z
      .number()
      .refine((value) => isValidNumber(value) && value >= 0, {
        message: 'A área de vegetação deve ser um número não negativo',
      }),
    crops: z
      .string()
      .min(3, { message: 'Nome da cultura deve ter pelo menos 3 caracteres' }),
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
    formState: { errors },
  } = useForm<NewProducerFormInputs>({
    resolver: zodResolver(producerFormSchema),
  })

  const handleSaveProducer = async (data: NewProducerFormInputs) => {
    try {
      if (id) {
        await api.put(`producers/${id}`, data)
        alert('Produtor editado com sucesso.')
      } else {
        await api.post('producers', data)
        alert('Produtor criado com sucesso.')
      }

      reset()
    } catch (error) {
      console.error('Error saving producer:', error)
    }
  }
  const fetchProducerData = async () => {
    try {
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
    } catch (error) {
      console.error('Error fetching producer data:', error)
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
          <h2 className="text-lg font-medium text-zinc-900">Personal info</h2>
          <span className="text-sm text-zinc-500">
            Update your personal details here.
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
        <div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-form">
          <label
            htmlFor="cpfOrCnpj"
            className="text-sm font-medium text-zinc-700"
          >
            CPF/CNPJ
          </label>
          <Input.Root>
            <Input.Control
              id="cpfOrCnpj"
              placeholder="CPF/CNPJ"
              required
              {...register('cpfOrCnpj')}
            />
          </Input.Root>
          <ErrorMessage error={errors.cpfOrCnpj?.message} />
        </div>
        <div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-form">
          <label
            htmlFor="farmName"
            className="text-sm font-medium text-zinc-700"
          >
            Nome da Fazenda
          </label>
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
        <div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-form">
          <label htmlFor="city" className="text-sm font-medium text-zinc-700">
            Cidade / Estado
          </label>
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2">
            <Input.Root>
              <Input.Control
                id="city"
                placeholder="Cidade"
                required
                {...register('city')}
              />
            </Input.Root>
            <ErrorMessage error={errors.city?.message} />
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
        <div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-form">
          <label
            htmlFor="totalArea"
            className="text-sm font-medium text-zinc-700"
          >
            Área total em hectares da fazenda
          </label>
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
        <div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-form">
          <label
            htmlFor="agriculturalArea"
            className="text-sm font-medium text-zinc-700"
          >
            Área agricultável em hectares
          </label>
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
        <div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-form">
          <label
            htmlFor="vegetationArea"
            className="text-sm font-medium text-zinc-700"
          >
            Área de vegetação em hectares
          </label>
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
      </form>
    </div>
  )
}
