import _ from 'lodash'
import { PropsResume } from '@/interfaces';
import { formatNumber } from '@/utils/formatNumber';

export const ResumeTotal = ({ data }: PropsResume) => {
  return (
    <div className='flex flex-col gap-2 text-xl'>
    <div className='self-end text-right flex flex-col gap-2 px-10'>
        <div className='flex gap-4 justify-end'>
          <dt className='font-bold text-gray-600'>Mano de Obra</dt>
          <dd className='leading-6 w-60 text-gray-700 sm:col-span-2 sm:mt-0'>
            {formatNumber(_.sumBy(data.activitiesToDo, a => Number(a.total) + data.activitiesGroupCost))}
          </dd>
        </div>

        <div className='flex gap-4 justify-end'>
          <dt className='font-bold text-gray-600'>Partes Requeridas</dt>
          <dd className='leading-6 w-60 text-gray-700 sm:col-span-2 sm:mt-0'>
            {formatNumber(_.sumBy(data.requiredParts, a => Number(a.total)))}
          </dd>
        </div>

        <div className='flex gap-4 justify-end'>
          <dt className='font-bold text-gray-600'>Otros Requerimientos</dt>
          <dd className='leading-6 w-60 text-gray-700 sm:col-span-2 sm:mt-0'>
            {formatNumber(_.sumBy(data.otherRequirements, a => Number(a.total)))}
          </dd>
        </div>
      </div>

      <div className='w-100 text-2xl gap-4 flex gap-4 justify-end m-8'>
        <dt className='font-bold text-gray-600'>Total</dt>
        <dd className='font-bold text-gray-700'>
          {formatNumber(Number(data.total))}
        </dd>
      </div>
    </div>
  )
}