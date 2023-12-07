import { Chart } from 'react-google-charts'
import { Loader } from 'lucide-react'

export function PieChart({
  data,
  title,
}: {
  data: { category: string; value: number }[]
  title: string
}) {
  const chartData = [
    ['Category', 'Value'],
    ...data.map(({ category, value }) => [category, Number(value)]),
  ]
  return (
    <div
      className={`mt-5 transform cursor-pointer rounded-lg border bg-white px-4 py-2 shadow-md transition duration-300 ease-out hover:scale-[103%] hover:shadow-lg`}
    >
      <div className={`flex justify-center rounded-lg bg-violet-50 py-4`}>
        <h2 className="text-sm/5 font-medium text-violet-700">{title}</h2>
      </div>
      {data.length > 1 ? (
        <Chart
          chartType="PieChart"
          data={chartData}
          options={{ title, is3D: true }}
          width={'100%'}
          height={'400px'}
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <Loader className="h-6 w-6 animate-spin text-zinc-400" />
        </div>
      )}
    </div>
  )
}
