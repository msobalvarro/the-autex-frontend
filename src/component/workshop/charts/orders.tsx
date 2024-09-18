import dayjs from 'dayjs'
import { Loader } from '@/component/ui/loader'
import { useAxios } from '@/hooks/fetch'
import { OrderDataReportResponsePropierties } from '@/interfaces'
import { Endpoints } from '@/router'
import { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'
import { chartColorList } from '@/helpers'

export const OrdersChart = () => {
  const [data, setData] = useState<Array<any> | null>(null)
  const [total, setTotal] = useState<number | null>(null)
  const from = dayjs().startOf('month').format('MM-DD-YYYY').toString()
  const to = dayjs().endOf('month').format('MM-DD-YYYY').toString()
  const { data: dataOrder, loading } = useAxios({
    endpoint: `${Endpoints.GET_ORDER_REPORT}?from=${from}&to=${to}`,
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

  return (
    <div className='p-4 flex relative items-center flex-col flex-1 bg-white overflow-auto rounded shadow'>
      <p className='text-xl text-gray-600 text-center'>{total} Totales de ordenes totales del mes de {dayjs().format('MMMM')}</p>
      {data && (
        <Chart
          chartType='PieChart'
          width='100%'
          height='400px'
          data={data}
          options={{ colors: chartColorList }}
        />
      )}

      <Loader active={loading} />
    </div>
  )
}
