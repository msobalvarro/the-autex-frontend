import dayjs from 'dayjs'
import {v4} from 'uuid'
import { EstimatePropierties } from '@/interfaces'
import { IoDocumentTextSharp } from 'react-icons/io5'
import { formatNumber } from '@/utils/formatNumber'
import { Link } from 'react-router-dom'
import { routes } from '@/router'

interface Props {
  estimations: EstimatePropierties[]
}

export const ListEstimateClient = ({ estimations }: Props) => {  
  return (
    <div className='flex flex-col flex-1 gap-2 flex-1'>
      <div className='flex items-center justify-between'>
        <p className='text-xl text-gray-600 ml-4 flex items-center gap-2'>
          <IoDocumentTextSharp className='text-xl' />
          Presupuestos
        </p>
      </div>

      <hr />

      <div className='flex flex-col'>
        {estimations.map(estimate => (
          <Link to={routes.ESTIMATE_DETAIL.replace(':id', String(estimate._id))} className='flex gap-4 items-center border-b border-gray-100 justify-between cursor-pointer px-4 py-2 transition hover:bg-gray-100 ' key={v4()}>
            <div className='flex flex-col'>
              <div className='flex items-center gap-3 text-gray-600'>                <p>
                {`
                  ${estimate?.vehicule?.year} 
                  ${estimate?.vehicule?.brand?.description} 
                  ${estimate?.vehicule?.model?.description}             
                  ${estimate?.vehicule?.plate}             
                `}
              </p>
              </div>

              <div className='flex items-center gap-3 text-gray-600'>
                <p className='text-sm'>{dayjs(estimate.createdAt).format('D MMMM YYYY')}</p>
              </div>
            </div>

            <p className='font-bold text-gray-600'>Total {formatNumber(Number(estimate.total))}</p>
          </Link>
        ))}

        {estimations.length === 0 && (
          <p className='text-gray-400 text-xl p-5'>No hay Presupuestos</p>
        )}
      </div>
    </div>
  )
}
