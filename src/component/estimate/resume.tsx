import { PropsResume } from '@/interfaces'

export const Resume = ({ data }: PropsResume) => (
  <div className='grid grid-cols-2 gap-4'>
    <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <dt className='font-bold text-gray-600'>Cliente</dt>
      <dd className='mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
        {data.client?.name}
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
    <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <dt className='font-bold text-gray-600'>Color</dt>
      <dd className='mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
        {data.vehicule?.color}
      </dd>
    </div>
  </div>
)
