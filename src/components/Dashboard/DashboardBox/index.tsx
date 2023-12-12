import { Boxes } from 'lucide-react'
import { calculateTotal } from '../../../utils/utils'
import { Producer } from '../../../store/producersSlice'

export const DashboardBox = ({ producers }: { producers: Producer[] }) => {
  const chartOptions = [
    {
      title: 'Total de fazendas em quantidade',
      color: 'violet',
      type: 'quantity',
    },
    {
      title: 'Total de fazendas em hectares (área total)',
      color: 'green',
      type: 'areaTotal',
    },
  ]

  const calculateTotalForType = (type: 'quantity' | 'areaTotal') => {
    return calculateTotal(producers, type)
  }
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
      {chartOptions.map((options, index) => (
        <div
          key={index}
          className={`flex h-32 transform cursor-pointer items-center justify-between rounded-lg border px-8 shadow-md transition duration-300 ease-out hover:scale-[103%] hover:shadow-lg 
            ${options.type === 'quantity'
              ? `border-l-4 border-violet-500`
              : `border-l-4 border-green-500`
            }`}
        >
          <div>
            <h2
              className={`text-sm font-medium ${options.type === 'quantity'
                  ? 'text-violet-500 hover:text-violet-700'
                  : 'text-green-500 hover:text-green-700'
                }`}
            >
              {options.title}
            </h2>
            <h1 className="truncate text-4xl font-extrabold text-zinc-500">
              {calculateTotalForType(options.type)}
            </h1>
          </div>
          <Boxes className="h-5 w-5 text-zinc-500" />
        </div>
      ))}
    </div>
  )
}
