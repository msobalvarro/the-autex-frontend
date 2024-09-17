import dayjs from 'dayjs'
import { Loader } from '@/component/ui/loader'
import { useAxios } from '@/hooks/fetch'
import { EstimateChartDataResponse } from '@/interfaces'
import { Endpoints } from '@/router'
import { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'

const data = [
  [
    { type: 'date', label: 'Day' },
    'Total'
  ],
  [new Date(2024, 1), 37.8],
  [new Date(2024, 2), 30.9],
  [new Date(2024, 3), 2],
  [new Date(2024, 4), 11.7],
  [new Date(2024, 5), 11.9],
  [new Date(2024, 6), 8.8],
  [new Date(2024, 7), 7.6],
  [new Date(2024, 8), 12.3],
  [new Date(2024, 9), 16.9],
  [new Date(2024, 10), 12.8],
  [new Date(2024, 11), 5.3],
  [new Date(2024, 12), 5]
]

const options = {
  chart: {
    title: 'Presupuesto',
    // subtitle: 'in millions of dollars (USD)',
  },
}

export const EstimationChart = () => {
  const [data, setData] = useState<Array<any> | null>(null)

  const from = dayjs().startOf('month').format('MM-DD-YYYY').toString()
  const to = dayjs().endOf('month').format('MM-DD-YYYY').toString()

  const { data: dataEstimate, loading } = useAxios({
    endpoint: `${Endpoints.GET_ESTIMATE_REPORT}?from=${from}&to=${to}`,
  })

  useEffect(() => {
    if (Array.isArray(dataEstimate)) {
      const newData: EstimateChartDataResponse[] = [...dataEstimate]
      
      setData([
        [
          { type: 'date', label: 'Day' },
          'Total'
        ],
        ...newData.map(value => ([new Date(value.date), value.count]))
      ])
    }
  }, [dataEstimate])

  return (
    <div className='p-4 flex relative flex-col flex-1 bg-white overflow-auto rounded shadow'>
      <div className='flex-1'>
        {/* <DateRangePicker.Pioc /> */}
      </div>

      {data && (
        <Chart
          chartType='Line'
          width='100%'
          height='400px'
          data={data}
          options={options}
        />
      )}

      <Loader active={loading} />
    </div>
  )
}
