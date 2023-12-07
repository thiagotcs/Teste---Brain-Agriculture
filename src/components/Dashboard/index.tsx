import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { loadProducers } from '../../store/producersSlice'
import { Button } from '../Button'
import { DashboardBox } from './DashboardBox'
import { PieChart } from '../PieChart'

export const Dashboard = () => {
  const dispatch = useAppDispatch()
  const { producers } = useAppSelector((state) => state.producers)
  useEffect(() => {
    dispatch(loadProducers())
  }, [dispatch])

  const producersDataByState = producers.map((producer) => ({
    category: producer.state,
    value: producer.id,
  }))

  const producersDataByCulture = producers.map((producer) => ({
    category: Array.isArray(producer.crops)
      ? producer.crops.join(', ')
      : producer.crops,
    value: producer.id,
  }))

  const producersDataByLandUse = producers.map((producer) => ({
    category: 'Área Agricultável e Vegetação',
    value: producer.agriculturalArea + producer.vegetationArea,
  }))

  const chartsData = [
    { type: 'state', title: 'Estado', data: producersDataByState },
    { type: 'culture', title: 'Cultura', data: producersDataByCulture },
    {
      type: 'landUse',
      title: 'Área Agricultável e Vegetação',
      data: producersDataByLandUse,
    },
  ]

  return (
    <div className="mt-6 flex flex-col ">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-5">
        <div className="space-y-1">
          <h2 className="text-lg font-medium text-zinc-900">Dashboard</h2>
          <span className="text-sm text-zinc-500">
            Most recent data update.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="primary">Generate Report</Button>
        </div>
      </div>
      <DashboardBox producers={producers} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        {chartsData.map((chart, index) => (
          <PieChart
            key={index}
            data={chart.data}
            chartType={chart.type}
            title={chart.title}
          />
        ))}
      </div>
    </div>
  )
}
