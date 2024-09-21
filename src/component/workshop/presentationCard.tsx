import { useAuth } from '@/hooks/auth'
import { FaBuilding } from 'react-icons/fa'
import { GrLocation } from 'react-icons/gr'

export const PresentationWorkshopCard = () => {
  const { auth } = useAuth()

  return (
    <div className='w-3/4 items-center py-8 flex justify-between gap-8 relative'>
      <div className='flex gap-4 items-center'>
        <FaBuilding size={64} className='text-gray-600' />
        <div className='flex flex-col items-start'>
          <p className='text-gray-600 text-4xl'>{auth?.workshop?.name}</p>
          <p className='text-gray-500 flex items-center gap-2'>
            <GrLocation />
            {auth?.workshop?.location}
          </p>
        </div>
      </div>
    </div>
  )
}