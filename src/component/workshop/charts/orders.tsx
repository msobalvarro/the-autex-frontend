import dayjs from 'dayjs'
import { Loader } from '@/component/ui/loader'
import { useAxios } from '@/hooks/fetch'
import { OrderDataReportResponsePropierties } from '@/interfaces'
import { Endpoints } from '@/router'
import { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'
import { chartColorList } from '@/helpers'
import { RangePickerReport } from '@/component/report/rangePicker'

export const OrdersChart = () => {
  const fromDefault = dayjs().startOf('month').format('MM-DD-YYYY').toString()
  const toDefault = dayjs().endOf('month').format('MM-DD-YYYY').toString()
  const [from, setFrom] = useState<null | string>(null)
  const [to, setTo] = useState<null | string>(null)
  const [data, setData] = useState<Array<any> | null>(null)
  const [total, setTotal] = useState<number | null>(null)
  const { data: dataOrder, loading, refetch } = useAxios({
    endpoint: `${Endpoints.GET_ORDER_REPORT}?from=${from || fromDefault}&to=${to || toDefault}`,
  })

  useEffect(() => {
    if (dataOrder) {
      const props: OrderDataReportResponsePropierties = dataOrder
      setTotal(props.total)
      setData([
        ['Tipo de Actividad', 'Cantidad'],
        ['Correctivos', props.corrective],
        ['Preventivos', props.preventive],
        ['Predictivos', props.predictive],
        ['Servicio', props.service],
        ['Matenimientos', props.maintenance],
      ])
    }
  }, [dataOrder])

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
    <div className='p-4 flex relative justify-between flex-col flex-1 bg-white overflow-auto rounded shadow'>
      <RangePickerReport onClearFilter={clearFilter} onChange={onChangeFilterRange} />

      {data && (
        <Chart
          chartType='PieChart'
          width='100%'
          height='400px'
          data={data}
          options={{ colors: chartColorList }}
        />
      )}

      <p className='text-md text-gray-600'>{total} Totales de ordenes totales</p>
      <Loader active={loading} />
    </div>
  )
}
