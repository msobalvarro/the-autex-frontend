import { LayoutComponent } from '@/component/layout'
import { Loader } from '@/component/loader'
import { TableComponent } from '@/component/table'
import { useAxios } from '@/hooks/fetch'
import { EstimatePropierties, OrderServicePropierties } from '@/interfaces'
import { Endpoints, routes } from '@/router'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { formatNumber } from '@/utils/formatNumber'
import { NewOrderService } from '@/component/modals/newOrderService'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface PropsQuery {
  id?: string
}

interface PropsResume {
  data: EstimatePropierties
}

const Resume = ({ data }: PropsResume) => (
  <div className='border-gray-100'>
    <dl className='divide-y divide-gray-100'>
      <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
        <dt className='text-sm font-bold text-gray-600'>Cliente</dt>
        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
          {data.client?.name}
        </dd>
      </div>
      <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
        <dt className='text-sm font-bold text-gray-600'>Vehiculo</dt>
        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
          {data.vehicule?.brand?.description} {data.vehicule?.model?.description} {data.vehicule?.year}
        </dd>
      </div>
      <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
        <dt className='text-sm font-bold text-gray-600'>Placa Unidad</dt>
        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
          {data.vehicule?.plate}
        </dd>
      </div>
      <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
        <dt className='text-sm font-bold text-gray-600'>Color</dt>
        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
          {data.vehicule?.color}
        </dd>
      </div>
      <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
        <dt className='text-sm font-bold text-gray-600'>Fecha registrada</dt>
        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
          {dayjs(data.createdAt).format('DD/MM/YYYY hh:mm A')}
        </dd>
      </div>
      <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
        <dt className='text-sm font-bold text-gray-600'>Actividades Totales</dt>
        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
          {data.activitiesToDo?.length}
        </dd>
      </div>
      <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
        <dt className='text-sm font-bold text-gray-600'>Partes Requeridas</dt>
        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
          {data.requiredParts?.length}
        </dd>
      </div>
      <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
        <dt className='text-sm font-bold text-gray-600'>Otros Requerimientos</dt>
        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
          {data.otherRequirements?.length}
        </dd>
      </div>

      <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
        <dt className='text-sm text-gray-600'>Total</dt>
        <dd className='mt-1 text-lg font-bold text-gray-700'>
          {formatNumber(Number(data.total))}
        </dd>
      </div>
    </dl>
  </div>
)

const Tables = ({ data }: PropsResume) => {
  return (
    <>
      <div className='flex flex-col gap-2'>
        <p className='text-lg text-gray-600 ml-2'>Actividades Previstas a Realizar</p>
        <TableComponent
          renderEnum
          data={
            data?.activitiesToDo?.map(a => ({
              'Descripción': a.description,
              'Cantidad': a.quantity,
              'Costo Unitario': a.unitCost,
              'Total': formatNumber(Number(a.total)),
              '__item': a,
            })) || []
          } />
      </div>

      <div className='flex flex-col gap-2'>
        <p className='text-lg text-gray-600 ml-2'>Partes Principales Requeridas</p>
        <TableComponent
          renderEnum
          data={
            data.requiredParts?.map(a => ({
              'Descripción': a.description,
              'Cantidad': a.quantity,
              'Costo Unitario': a.unitCost,
              'Total': formatNumber(Number(a.total)),
              '__item': a,
            })) || []
          } />
      </div>

      <div className='flex flex-col gap-2'>
        <p className='text-lg text-gray-600 ml-2'>Otros Requerimientos</p>
        <TableComponent
          renderEnum
          data={
            data.otherRequirements?.map(a => ({
              'Descripción': a.description,
              'Cantidad': a.quantity,
              'Costo Unitario': a.unitCost,
              'Total': formatNumber(Number(a.total))
            })) || []
          } />
      </div>

      <div className='flex flex-col gap-2'>
        <p className='text-lg text-gray-600 ml-2'>Actividades Externas</p>
        <TableComponent
          renderEnum
          data={
            data.externalActivities?.map(a => ({
              'Descripción': a.description,
              'Cantidad': a.quantity,
              'Costo Unitario': a.unitCost,
              'Total': formatNumber(Number(a.total))
            })) || []
          } />
      </div>
    </>
  )
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