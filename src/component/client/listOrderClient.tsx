import dayjs from 'dayjs'
import { OrderServicePropierties } from '@/interfaces'
import { FaCalendarCheck } from 'react-icons/fa6'
import { IoCarSportSharp } from 'react-icons/io5'
import { MdOutlineWork } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { routes } from '@/router'

interface Props {
  orders: OrderServicePropierties[]
}

export const ListOrderClient = ({ orders }: Props) => {
  return (
    <div className='flex flex-col flex-1 gap-2 flex-1'>
      <p className='text-xl text-gray-600 ml-4 flex items-center gap-2'>
        <MdOutlineWork className='text-xl' />
        Ordenes de servicio
      </p>

      <div className='flex flex-col'>
        {orders.map(order => (
          <Link to={routes.ORDER_DETAIL.replace(':id', String(order._id))} className='flex gap-4 border-b border-gray-100 justify-between cursor-pointer p-4 transition hover:bg-gray-100 hover:border-gray-600' key={crypto.randomUUID()}>
            <div className='flex items-center gap-3 text-gray-600'>
              <FaCalendarCheck className='text-xl' />
              <p>{dayjs(order.createdAt).format('D MMMM YYYY')}</p>
            </div>

            <div className='flex items-center gap-3 text-gray-600'>
              <IoCarSportSharp className='text-xl' />
              <p>
                {`
                ${order.estimateProps?.vehicule?.year} 
                ${order.estimateProps?.vehicule?.brand?.description} 
                ${order.estimateProps?.vehicule?.model?.description}             
                ${order.estimateProps?.vehicule?.plate}             
              `}
              </p>
            </div>
          </Link>
        ))}

        {orders.length === 0 && (
          <p className='text-gray-400 text-xl p-5'>No hay Ordenes</p>
        )}
      </div>
    </div>
  )
}
