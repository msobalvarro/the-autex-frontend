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
  const from = dayjs().startOf('month').format('MM-DD-YYYY').toString()
  const to = dayjs().endOf('month').format('MM-DD-YYYY').toString()
  const { data: dataOrder, loading } = useAxios({
    endpoint: `${Endpoints.GET_ORDER_REPORT}?from=${from}&to=${to}`,
  })

  useEffect(() => {
    if (dataOrder) {
      const props: OrderDataReportResponsePropierties = dataOrder

      setData([
        ['Tipo de Actividad', 'Cantidad'],
        ['Correctivos', props.corrective],
        ['Preventivos', props.preventive],
        ['Predictivos', props.predictive],
        ['Service', props.service],
        ['Matenimientos', props.maintenance],
      ])
    }
  }, [dataOrder])

  return (
    <div className='p-4 flex relative flex-col flex-1 bg-white overflow-auto rounded shadow'>
      {data && (
        <Chart
          chartType='PieChart'
          width='100%'
          height='400px'
          data={data}
          options={{
            title: 'Tipos de Ordene',
            colors: chartColorList
          }}
        />
      )}

      <Loader active={loading} />
    </div>
  )
}
