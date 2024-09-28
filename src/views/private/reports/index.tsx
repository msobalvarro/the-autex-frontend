import { IncomeReport } from '@/component/report/icomeReport'
import { EstimationChart } from '@/component/workshop/charts/estimations'
import { OrdersChart } from '@/component/workshop/charts/orders'

export const ReportView = () => {
  return (
    <div className='flex gap-4 flex-col items-center w-full px-10'>
      <IncomeReport />

      <div className='flex lg:flex-row sm:flex-col md:flex-col sm:w-full lg:w-4/5 flex-1 gap-4 flex-1'>
        <EstimationChart />
        <OrdersChart />
      </div>
    </div>
  )
}
