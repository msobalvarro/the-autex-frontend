import { Client } from '@/interfaces'
import { useAxios } from '@/hooks/fetch'
import { Endpoints } from '@/router'
import { ListOrderClient } from './listOrderClient'
import { ClientVehiculeList } from './listOrderVehicules'
import { ListEstimateClient } from './listEstimate'
import { Loader } from '@/component/ui/loader'
import { BackButton } from '@/component/ui/back'

interface Props {
  client: Client
  refetch: () => void
}

export const ClientReporter = ({ client, refetch }: Props) => {
  const { data: orders, loading: loadingOrders } = useAxios({
    endpoint: Endpoints.GET_ORDER_BY_CLIENT_ID.replace(':id', client._id)
  })

  const { data: estimations, loading: loadingEstimations } = useAxios({
    endpoint: Endpoints.GET_ESTIMATION_BY_CLIENT_ID.replace(':id', client._id)
  })

  if (loadingOrders || loadingEstimations) return <Loader active />
  return (
    <div className='flex flex-1 flex-col'>
      <BackButton />

      <div className='flex flex-col gap-4 flex-1 bg-white p-4 py-8 rounded shadow-md'>        
        <div className='flex gap-4'>
          <ClientVehiculeList refetch={refetch} client={client} vehicules={client.vehicules} />
          {estimations && <ListEstimateClient estimations={estimations} />}
        </div>

        <hr />


        {orders && <ListOrderClient orders={orders} />}
      </div>

      <Loader active={loadingOrders} />
    </div>
  )
}