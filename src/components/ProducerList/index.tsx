import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { useNavigate } from 'react-router-dom'
import { Loader, PencilLine, Trash2 } from 'lucide-react'
import { Button } from '../Button'
import { loadProducers } from '../../store/producersSlice'
import { api } from '../../services/api'

export function ProducerList() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { producers, orderedProducers, isLoading } = useAppSelector(
    (state) => state.producers,
  )

  useEffect(() => {
    dispatch(loadProducers())
  }, [dispatch])

  const editProducer = (id: number) => {
    navigate(`/add-producer/${id}/edit`)
  }

  const removeProducer = async (id: number): Promise<void> => {
    try {
      const confirmed = window.confirm('Do you want to remove?')
      if (!confirmed) {
        return
      }

      const response = await api.delete(`producers/${id}`)

      if (response.status === 200) {
        alert('Removed successfully.')
        window.location.reload()
      } else {
        console.log('Error removing producer:', response.statusText)
      }
    } catch (error) {
      handleRemoveError(error)
    }
  }

  const handleRemoveError = (error: unknown): void => {
    if (error instanceof Error) {
      console.error('Error removing producer:', error.message)
    } else {
      console.error('Unknown error removing producer:', error)
    }
  }

  return (
    <div className="mt-6 flex w-full flex-col gap-5  divide-zinc-200">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader className="h-6 w-6 animate-spin text-zinc-400" />
        </div>
      ) : (
        <div className="mt-1 flex-1 overflow-auto">
          <table className="min-w-600 w-full border-collapse">
            <thead>
              <tr>
                <th className="border-t-l border-t-r  bg-gray-200 py-4 text-center text-sm leading-6 text-gray-600">
                  ID
                </th>
                <th className="border-t-l border-t-r  bg-gray-200 py-4 text-center text-sm leading-6 text-gray-600">
                  Nome
                </th>
                <th className="border-t-l border-t-r  bg-gray-200 py-4 text-center text-sm leading-6 text-gray-600">
                  Fazenda
                </th>
                <th className="border-t-l border-t-r  bg-gray-200 py-4 text-center text-sm leading-6 text-gray-600">
                  CPF/CNPJ
                </th>
                <th className="border-t-l border-t-r  bg-gray-200 py-4 text-center text-sm leading-6 text-gray-600">
                  Cidade
                </th>
                <th className="border-t-l border-t-r  bg-gray-200 py-4 text-center text-sm leading-6 text-gray-600">
                  Estado
                </th>
                <th className="border-t-l border-t-r  bg-gray-200 py-4 text-center text-sm leading-6 text-gray-600">
                  hectares
                </th>
                <th className="border-t-l border-t-r  bg-gray-200 py-4 text-center text-sm leading-6 text-gray-600">
                  agricultável
                </th>
                <th className="border-t-l border-t-r bg-gray-200 py-4 text-center text-sm leading-6 text-gray-600">
                  vegetação
                </th>
                <th className="border-t-l border-t-r bg-gray-200 py-4 text-center text-sm leading-6 text-gray-600">
                  Culturas plantadas
                </th>
                <th className="border-t-l border-t-r bg-gray-200 py-4 text-center text-sm leading-6 text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {producers && orderedProducers && orderedProducers.length > 0 ? (
                orderedProducers.map((item) => (
                  <tr key={item.id}>
                    <td className=" leading-6overflow-ellipsis whitespace-nowrap border-t-4 border-gray-400 bg-gray-100 py-4 pl-6 text-sm">
                      {item.id}
                    </td>
                    <td className=" leading-6overflow-ellipsis whitespace-nowrap border-t-4 border-gray-400 bg-gray-100 py-4 pl-6 text-sm">
                      {item.producerName}
                    </td>
                    <td className=" leading-6overflow-ellipsis whitespace-nowrap border-t-4 border-gray-400 bg-gray-100 py-4 pl-6 text-sm">
                      {item.farmName}
                    </td>
                    <td className=" leading-6overflow-ellipsis whitespace-nowrap border-t-4 border-gray-400 bg-gray-100 py-4 pl-6 text-sm">
                      {item.cpfOrCnpj}
                    </td>
                    <td className=" leading-6overflow-ellipsis whitespace-nowrap border-t-4 border-gray-400 bg-gray-100 py-4 pl-6 text-sm">
                      {item.city}
                    </td>
                    <td className=" leading-6overflow-ellipsis whitespace-nowrap border-t-4 border-gray-400 bg-gray-100 py-4 pl-6 text-sm">
                      {item.state}
                    </td>
                    <td className=" leading-6overflow-ellipsis whitespace-nowrap border-t-4 border-gray-400 bg-gray-100 py-4 pl-6 text-sm">
                      {item.totalArea}
                    </td>
                    <td className=" leading-6overflow-ellipsis whitespace-nowrap border-t-4 border-gray-400 bg-gray-100 py-4 pl-6 text-sm">
                      {item.agriculturalArea}
                    </td>
                    <td className=" leading-6overflow-ellipsis whitespace-nowrap border-t-4 border-gray-400 bg-gray-100 py-4 pl-6 text-sm">
                      {item.vegetationArea}
                    </td>
                    <td className=" leading-6overflow-ellipsis whitespace-nowrap border-t-4 border-gray-400 bg-gray-100 py-4 pl-6 text-sm">
                      {item.crops}
                    </td>
                    <td className=" leading-6overflow-ellipsis whitespace-nowrap border-t-4 border-gray-400 bg-gray-100 py-4 pl-6 text-sm">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          editProducer(item.id)
                        }}
                      >
                        <PencilLine className="h-5 w-5 text-zinc-500" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          removeProducer(item.id)
                        }}
                      >
                        <Trash2 className="h-5 w-5 text-zinc-500" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>Nenhum produtor encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
