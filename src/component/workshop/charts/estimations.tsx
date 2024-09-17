import dayjs from 'dayjs'
import { Loader } from '@/component/ui/loader'
import { useAxios } from '@/hooks/fetch'
import { ReportChartDataResponse } from '@/interfaces'
import { Endpoints } from '@/router'
import { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'
import { chartColorList } from '@/helpers'

export const EstimationChart = () => {
  const [data, setData] = useState<Array<any> | null>(null)
  const from = dayjs().startOf('month').format('MM-DD-YYYY').toString()
  const to = dayjs().endOf('month').format('MM-DD-YYYY').toString()
  const { data: dataEstimate, loading } = useAxios({
    endpoint: `${Endpoints.GET_ESTIMATE_REPORT}?from=${from}&to=${to}`,
  })

  useEffect(() => {
    if (Array.isArray(dataEstimate)) {
      const newData: ReportChartDataResponse[] = [...dataEstimate]

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

      {data && (
        <Chart
          chartType='Line'
          width='100%'
          height='400px'
          data={data}
          options={{
            title: 'Presupuesto',
            colors: chartColorList
          }}
        />
      )}

      <Loader active={loading} />
    </div>
  )
}
