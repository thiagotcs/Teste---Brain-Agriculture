import React from 'react'

interface Producer {
  id: number
  producerName: string
  farmName: string
  cpfOrCnpj: string
  city: string
  state: string
  agriculturalArea: number
  vegetationArea: number
  totalArea: number
  crops: string
}

interface TableProps {
  producers: Producer[]
}

export const Table: React.FC<TableProps> = ({ producers }) => {
  if (producers.length === 0) {
    return <div>Nenhum dado disponível para exibir.</div>
  }

  // Definindo a ordem desejada para as colunas
  const columnOrder = [
    'id',
    'cpfOrCnpj',
    'producerName',
    'farmName',
    'city',
    'state',
    'totalArea',
    'agriculturalArea',
    'vegetationArea',
    'crops',
  ]

  return (
    <div className="mb-8 hidden grid-cols-11 gap-4 md:grid">
      {/* Títulos das Colunas */}
      {columnOrder.map((title, index) => (
        <div key={index} className="col-span-1 font-bold">
          {title}
        </div>
      ))}

      {/* Conteúdo da Tabela */}
      {producers.map((producer, producerIndex) => (
        <div key={producerIndex} className="flex flex-wrap">
          {columnOrder.map((key, keyIndex) => (
            <div key={`${producerIndex}-${keyIndex}`} className="col-span-1">
              <div className="font-bold">{key}</div>
              <div>{producer[key]}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
