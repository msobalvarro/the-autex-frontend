import { LayoutComponent } from '@/component/ui/layout'
import { EstimationChart } from '@/component/workshop/charts/estimations'
import { OrdersChart } from '@/component/workshop/charts/orders'

export const WorkshopView = () => {
  return (
    <div className='flex flex-col mt-10 items-center w-full px-10'>
      <div className='flex w-3/4 flex-1 gap-10 flex-1'>
        <EstimationChart />

        <div className='p-4 flex-1 bg-white overflow-auto rounded shadow'>
          <OrdersChart />
        </div>
      </div>

      <LayoutComponent>
        <p>Workshop Detail</p>
      </LayoutComponent>
    </div>
  )
}