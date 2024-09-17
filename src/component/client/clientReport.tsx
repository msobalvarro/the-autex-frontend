import { IoChevronBack } from 'react-icons/io5'
import { Client } from '@/interfaces'
import { useNavigate } from 'react-router-dom'
import { useAxios } from '@/hooks/fetch'
import { Endpoints } from '@/router'
import { Loader } from '../ui/loader'
import { ListOrderClient } from './listOrderClient'
import { ClientVehiculeList } from './listOrderVehicules'
import { ListEstimateClient } from './listEstimate'
import { BackButton } from '../ui/back'

interface Props {
  client: Client
}

export const ClientReporter = ({ client }: Props) => {
  const { data: orders, loading: loadingOrders } = useAxios({
    endpoint: Endpoints.GET_ORDER_BY_CLIENT_ID.replace(':id', client._id)
  })

  const { data: estimations, loading: loadingEstimations } = useAxios({
    endpoint: Endpoints.GET_ESTIMATION_BY_CLIENT_ID.replace(':id', client._id)
  })

  if (loadingOrders || loadingEstimations) return <Loader active />

  return (
    <div className='flex flex-1 flex-col relative'>
      <BackButton />

      <div className='flex flex-col gap-4 flex-1 bg-white p-4 py-8 rounded shadow-md'>
        <div className='flex gap-4'>
          <ClientVehiculeList vehicules={client.vehicules} />
          {orders && <ListOrderClient orders={orders} />}
        </div>

        <hr />

        {estimations && <ListEstimateClient estimations={estimations} />}
      </div>

      <Loader active={loadingOrders} />
    </div>
  )
}