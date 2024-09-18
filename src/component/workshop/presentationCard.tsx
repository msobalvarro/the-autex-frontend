import { useAuth } from '@/hooks/auth'
import { FaBuilding } from 'react-icons/fa'
import { GrLocation } from 'react-icons/gr'

export const PresentationWorkshopCard = () => {
  const { auth } = useAuth()

  return (
    <div className={`w-2/3 py-8 flex justify-end gap-8 relative`}>
      <div className='flex flex-col items-end'>
        <p className='text-gray-600 text-4xl'>{auth?.workshop?.name}</p>
        <p className='text-gray-500 flex items-center gap-2'>
          <GrLocation />
          {auth?.workshop?.location}
        </p>
      </div>

      <FaBuilding size={64} className='text-gray-600' />
    </div>
  )
}