import { PropsResume } from '@/interfaces'
import { formatNumber } from '@/utils/formatNumber'
import dayjs from 'dayjs'

export const Resume = ({ data }: PropsResume) => (
  <div className='border-gray-100 divide-y divide-gray-100 grid grid-cols-2 gap-4'>
    <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <dt className='text-sm font-bold text-gray-600'>Cliente</dt>
      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
        {data.client?.name}
      </dd>
    </div>
    <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <dt className='text-sm font-bold text-gray-600'>Vehiculo</dt>
      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
        {data.vehicule?.brand?.description} {data.vehicule?.model?.description} {data.vehicule?.year}
      </dd>
    </div>
    <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <dt className='text-sm font-bold text-gray-600'>Placa Unidad</dt>
      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
        {data.vehicule?.plate}
      </dd>
    </div>
    <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <dt className='text-sm font-bold text-gray-600'>Color</dt>
      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
        {data.vehicule?.color}
      </dd>
    </div>
    <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <dt className='text-sm font-bold text-gray-600'>Fecha registrada</dt>
      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
        {dayjs(data.createdAt).format('DD/MM/YYYY hh:mm A')}
      </dd>
    </div>
    <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <dt className='text-sm font-bold text-gray-600'>Actividades Totales</dt>
      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
        {data.activitiesToDo?.length}
      </dd>
    </div>
    <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <dt className='text-sm font-bold text-gray-600'>Partes Requeridas</dt>
      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
        {data.requiredParts?.length}
      </dd>
    </div>
    <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <dt className='text-sm font-bold text-gray-600'>Otros Requerimientos</dt>
      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
        {data.otherRequirements?.length}
      </dd>
    </div>
    <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <dt className='text-sm font-bold text-gray-600'>Grupo de actividad</dt>
      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
        {data.activitiesGroup?.name}
      </dd>
    </div>

    <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <dt className='text-sm text-gray-600'>Total</dt>
      <dd className='mt-1 text-lg font-bold text-gray-700'>
        {formatNumber(Number(data.total))}
      </dd>
    </div>
  </div>
)
