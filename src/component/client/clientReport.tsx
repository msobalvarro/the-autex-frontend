import { IoChevronBack } from 'react-icons/io5'
import { Client } from '@/interfaces'
import { useNavigate } from 'react-router-dom'
import { useAxios } from '@/hooks/fetch'
import { Endpoints } from '@/router'
import { Loader } from '../ui/loader'
import { ListOrderClient } from './listOrderClient'
import { ClientVehiculeList } from './listOrderVehicules'

interface Props {
  client: Client
}

export const ClientReporter = ({ client }: Props) => {
  const navigate = useNavigate()
  const onBack = () => navigate(-1)
  const { data: orders, loading: loadingOrders } = useAxios({
    endpoint: Endpoints.GET_ESTIMATION_BY_CLIENT_ID.replace(':id', client._id)
  })

  if (loadingOrders) return <Loader active />

  return (
    <div className='flex flex-1 flex-col'>
      <button onClick={onBack} className='flex items-center self-start gap-2 p-2 rounded hover:underline'>
        <IoChevronBack /> Volver
      </button>

      <div className='flex-1 bg-white p-4 py-8 rounded shadow-md'>
        <div className='flex gap-4'>
          <ClientVehiculeList vehicules={client.vehicules} />
          {orders && <ListOrderClient orders={orders} />}
        </div>
      </div>

      <Loader active={loadingOrders} />
    </div>
  )
}