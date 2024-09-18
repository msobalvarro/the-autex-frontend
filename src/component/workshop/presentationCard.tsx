import { useAuth } from '@/hooks/auth'
import { FaBuilding } from 'react-icons/fa'
import { GrLocation } from 'react-icons/gr'
import { IoIosSettings } from 'react-icons/io'

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


      <div className='relative group'>
        <button data-tooltip-target='tooltip-default' className='p-2 transition hover:rotate-12'>
          <IoIosSettings className='text-6xl text-gray-600' />
        </button>
        <div className='absolute left-1/2 transform -translate-x-1/2 w-max bg-gray-600 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          Configuraciones
        </div>
      </div>

      {/* <DateRangePicker
        onChange={(value) => console.log(value.end.toDate(getLocalTimeZone()))}
        className='max-w-xs'
      /> */}
    </div>
  )
}