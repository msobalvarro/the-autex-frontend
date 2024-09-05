import { PropsResume } from '@/interfaces';
import { formatNumber } from '@/utils/formatNumber';

export const ResumeTotal = ({ data }: PropsResume) => {
  return (
    <div className='flex flex-col'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
          <dt className='text-sm font-bold text-gray-600'>Actividades Totales</dt>
          <dd className='text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
            {data.activitiesToDo?.length}
          </dd>
        </div>

        <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
          <dt className='text-sm font-bold text-gray-600'>Partes Requeridas</dt>
          <dd className='text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
            {data.requiredParts?.length}
          </dd>
        </div>

        <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
          <dt className='text-sm font-bold text-gray-600'>Otros Requerimientos</dt>
          <dd className='text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
            {data.otherRequirements?.length}
          </dd>
        </div>

        <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
          <dt className='text-sm font-bold text-gray-600'>Grupo de actividad</dt>
          <dd className='text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
            {data.activitiesGroup?.name}
          </dd>
        </div>
      </div>

      <div className='w-100 text-2xl gap-4 flex items-center justify-end'>
        <dt className='font-bold text-gray-600'>Total</dt>
        <dd className='font-bold text-gray-700'>
          {formatNumber(Number(data.total))}
        </dd>
      </div>
    </div>
  )
}