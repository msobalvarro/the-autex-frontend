import { PropsResume } from '@/interfaces'
import { routes } from '@/router'
import { Link } from 'react-router-dom'

export const Resume = ({ data }: PropsResume) => (
  <div className='grid grid-cols-2'>
    <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <dt className='font-bold text-gray-600'>Cliente</dt>
      <dd className='mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
        <Link className='text-sky-600' to={routes.CLIENT_DETAIL.replace(':id', String(data.client?._id))}>{data.client?.name}</Link>
      </dd>
    </div>

    <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <dt className='font-bold text-gray-600'>Vehiculo</dt>
      <dd className='mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
        {data.vehicule?.brand?.description} {data.vehicule?.model?.description} {data.vehicule?.year}
      </dd>
    </div>

    <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <dt className='font-bold text-gray-600'>Placa Unidad</dt>
      <dd className='mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
        {data.vehicule?.plate}
      </dd>
    </div>

    <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <dt className='font-bold text-gray-600'>Color</dt>
      <dd className='mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
        {data.vehicule?.color}
      </dd>
    </div>

    <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <dt className='font-bold text-gray-600'>Número de Motor</dt>
      <dd className='mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
        {data.vehicule?.motorNumber}
      </dd>
    </div>

    <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <dt className='font-bold text-gray-600'>Número de Chasis</dt>
      <dd className='mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
        {data.vehicule?.chasisNumber}
      </dd>
    </div>
  </div>
)
