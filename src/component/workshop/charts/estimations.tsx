import _ from 'lodash'
import dayjs from 'dayjs'
import { Loader } from '@/component/ui/loader'
import { useAxios } from '@/hooks/fetch'
import { ReportChartDataResponse } from '@/interfaces'
import { Endpoints } from '@/router'
import { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'
import { chartColorList } from '@/helpers'
import { RangePickerReport } from '@/component/report/rangePicker'

export const EstimationChart = () => {
  const fromDefault = dayjs().startOf('month').format('MM-DD-YYYY').toString()
  const toDefault = dayjs().endOf('month').format('MM-DD-YYYY').toString()
  const [from, setFrom] = useState<null | string>(null)
  const [to, setTo] = useState<null | string>(null)
  const [total, setTotal] = useState<number | null>(null)
  const [data, setData] = useState<Array<any> | null>(null)

  const { data: dataEstimate, loading, refetch } = useAxios({
    endpoint: `${Endpoints.GET_ESTIMATE_REPORT}?from=${from || fromDefault}&to=${to || toDefault}`,
  })

  useEffect(() => {
    if (Array.isArray(dataEstimate)) {
      const newData: ReportChartDataResponse[] = [...dataEstimate]
      const sum = _.sumBy(newData, v => v.count)
      setTotal(sum)
      setData([
        [
          { type: 'date', label: 'Day' },
          `Total: ${sum}`
        ],
        ...newData.map(value => ([new Date(value.date), value.count]))
      ])
    }
  }, [dataEstimate])

  const onChangeFilterRange = (from: Date, to: Date) => {
    setFrom(dayjs(from).format('MM-DD-YYYY').toString())
    setTo(dayjs(to).format('MM-DD-YYYY').toString())

    refetch()
  }

  const clearFilter = () => {
    setTo(null)
    setFrom(null)
  }

  return (
    <div className='p-4 justify-between flex relative gap-8 flex-col flex-1 bg-white overflow-auto rounded shadow'>
      <RangePickerReport onClearFilter={clearFilter} onChange={onChangeFilterRange} />

      {data && (
        <Chart
          chartType='Line'
          width='100%'
          height='400px'
          data={data}
          options={{
            colors: chartColorList
          }}
        />
      )}

      <p className='text-md text-gray-600'>{total} Presupuestos creados</p>
      <Loader active={loading} />
    </div>
  )
}
