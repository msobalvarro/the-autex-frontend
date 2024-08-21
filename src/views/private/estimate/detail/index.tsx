import { LayoutComponent } from '@/component/layout'
import { Loader } from '@/component/loading'
import { TableComponent } from '@/component/table'
import { useAxios } from '@/hooks/fetch'
import { EstimatePropierties } from '@/interfaces'
import { Endpoints } from '@/router'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'

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
        <dt className='text-sm font-medium leading-6 text-gray-900'>Cliente</dt>
        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
          {data.client?.name}
        </dd>
      </div>
      <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
        <dt className='text-sm font-medium leading-6 text-gray-900'>Vehiculo</dt>
        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
          {data.vehicule?.brand?.description} {data.vehicule?.model?.description} {data.vehicule?.year}
        </dd>
      </div>
      <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
        <dt className='text-sm font-medium leading-6 text-gray-900'>Placa Unidad</dt>
        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
          {data.vehicule?.plate}
        </dd>
      </div>
      <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
        <dt className='text-sm font-medium leading-6 text-gray-900'>Color</dt>
        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
          {data.vehicule?.color}
        </dd>
      </div>
      <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
        <dt className='text-sm font-medium leading-6 text-gray-900'>Fecha registrada</dt>
        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
          {dayjs(data?.createdAt).format('LTS')}
        </dd>
      </div>
      <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
        <dt className='text-sm font-medium leading-6 text-gray-900'>Actividades Totales</dt>
        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
          {data.activitiesToDo?.length}
        </dd>
      </div>
      <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
        <dt className='text-sm font-medium leading-6 text-gray-900'>Partes Requeridas</dt>
        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
          {data.requiredParts?.length}
        </dd>
      </div>
      <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
        <dt className='text-sm font-medium leading-6 text-gray-900'>Otros Requerimientos</dt>
        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
          {data.otherRequirements?.length}
        </dd>
      </div>

      <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
        <dt className='text-sm font-medium leading-6 text-gray-900'>Total</dt>
        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
          C$ {data.total}
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
          data={data.activitiesToDo?.map(a => ({
            'Descripción': a.description,
            'Cantidad': a.quantity,
            'Costo Unitario': a.unitCost,
            'Total': a.total
          }))} />
      </div>

      <div className='flex flex-col gap-2'>
        <p className='text-lg text-gray-600 ml-2'>Partes Principales Requeridas</p>
        <TableComponent
          renderEnum
          data={data.requiredParts?.map(a => ({
            'Descripción': a.description,
            'Cantidad': a.quantity,
            'Costo Unitario': a.unitCost,
            'Total': a.total
          }))} />
      </div>

      <div className='flex flex-col gap-2'>
        <p className='text-lg text-gray-600 ml-2'>Otros Requerimientos</p>
        <TableComponent
          renderEnum
          data={data.otherRequirements?.map(a => ({
            'Descripción': a.description,
            'Cantidad': a.quantity,
            'Costo Unitario': a.unitCost,
            'Total': a.total
          }))} />
      </div>
    </>
  )
}

export const DetailEstimateView = () => {
  const queryParams: PropsQuery = useParams()
  const { data, loading, error } = useAxios({
    endpoint: Endpoints.GET_ESTIMATION_DETAIL_BY_ID + queryParams.id
  })

  if (error) {
    <LayoutComponent>
      <div className='h-48 flex flex-col'>
        <p className='text-2lg text-gray-600'>Ha ocurrido un error</p>
        <p className='text-md text-gray-400'>{String(error)}</p>
      </div>
    </LayoutComponent>
  }

  return (
    <LayoutComponent>
      {data && (
        <div className='flex gap-8'>
          <div className='flex-1'>
            <Resume data={data} />
          </div>
          <div className='flex-1 flex flex-col gap-8'>
            <Tables data={data} />
          </div>
        </div>
      )}

      <Loader active={loading} />
    </LayoutComponent>
  )
}