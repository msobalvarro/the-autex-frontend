import { LayoutComponent } from '@/component/ui/layout'
import { Loader } from '@/component/ui/loader'
import { useAxios } from '@/hooks/fetch'
import { EstimatePropierties, OrderServicePropierties } from '@/interfaces'
import { Endpoints, routes } from '@/router'
import { useParams } from 'react-router-dom'
import { NewOrderService } from '@/component/modals/newOrderService'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Resume } from '@/component/estimate/resume'
import { Tables } from '@/component/estimate/tables'

interface PropsQuery {
  id?: string
}

export const DetailEstimateView = () => {
  const [isOpenModal, setOpen] = useState<boolean>(false)
  const queryParams: PropsQuery = useParams()
  const { data, loading, error, refetch } = useAxios({
    endpoint: Endpoints.GET_ESTIMATION_ORDER_DETAIL_BY_ID + queryParams.id
  })

  const estimate: EstimatePropierties = data ? data?.['estimate'] : {}

  const order: OrderServicePropierties = data ? data?.['order'] : {}

  if (error) {
    return (
      <LayoutComponent>
        <div className='h-48 flex flex-col'>
          <p className='text-2lg text-gray-600'>Ha ocurrido un error</p>
          <p className='text-md text-gray-400'>{String(error)}</p>
        </div>
      </LayoutComponent>
    )
  }

  if (!estimate) {
    return (
      <LayoutComponent>
        <div className='h-48 flex flex-col'>
          <p className='text-2lg text-gray-600'>No se encotró registros</p>
        </div>
      </LayoutComponent>
    )
  }

  return (
    <LayoutComponent renderBack>
      {
        estimate?.['_id'] && (
          <div className='flex items-center flex-1 justify-between'>
            <p className='text-2xl text-gray-600'>
              Presupuesto ID <code className='bg-gray-100 text-xl p-1'>{estimate?.['_id']}</code>
            </p>

            {!order && (
              <button onClick={() => setOpen(true)} className='bg-gray-700 p-2 rounded text-white hover:bg-gray-600'>
                Generar Orden de Servicio
              </button>
            )}

            {order && (
              <div className='flex items-center gap-4'>
                <Link to={routes.ORDER_DETAIL.replace(':id', String(order._id))} className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
                  Ver Orden
                </Link>
                <p className='text-gray-400 text-xl uppercase'>[{order?.['status']}]</p>
              </div>
            )}
          </div>
        )
      }

      {estimate && (
        <div className='flex gap-8'>
          <div className='flex-1'>
            <Resume data={estimate} />
          </div>
          <div className='flex-1 flex flex-col gap-8'>
            <Tables data={estimate} />
          </div>
        </div>
      )}

      {isOpenModal && <NewOrderService onUpdate={refetch} estimateId={queryParams.id} setOpen={setOpen} />}

      <Loader active={loading} />
    </LayoutComponent>
  )
}