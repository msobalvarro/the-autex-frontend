import { EstimationChart } from '@/component/workshop/charts/estimations'
import { OrdersChart } from '@/component/workshop/charts/orders'
import { ClientView } from '../clients'
import { VehiculesView } from '../vehicules'
import { UserList } from '@/component/user/userList'
import { useAuth } from '@/hooks/auth'

export const WorkshopView = () => {
  const { auth } = useAuth()
  
  return (
    <div className='flex gap-4 flex-col items-center w-full px-10'>
      {auth?.isAdmin && (
        <UserList />
      )}
      <div className='flex w-3/4 flex-1 gap-4 flex-1'>
        <EstimationChart />
        <OrdersChart />
      </div>
      <ClientView />
      <VehiculesView />
    </div>
  )
}