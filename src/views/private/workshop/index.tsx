import { LayoutComponent } from '@/component/ui/layout'
import { EstimationChart } from '@/component/workshop/charts/estimations'
import { OrdersChart } from '@/component/workshop/charts/orders'
import { ClientView } from '../clients'
import { VehiculesView } from '../vehicules'

export const WorkshopView = () => {
  return (
    <div className='flex gap-4 flex-col items-center w-full px-10'>
      <div className='flex w-3/4 flex-1 gap-10 flex-1'>
        <EstimationChart />
        <OrdersChart />
      </div>

      <LayoutComponent>
        <p>Workshop Detail</p>
      </LayoutComponent>

      <ClientView />

      <VehiculesView />
    </div>
  )
}