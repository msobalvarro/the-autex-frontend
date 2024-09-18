import { useAuth } from '@/hooks/auth'
import { FaBuilding } from 'react-icons/fa'
import { GrLocation } from 'react-icons/gr'
import { IoIosSettings } from 'react-icons/io'
import { UiTooltip } from '../ui/tooltip'
import { useState } from 'react'
import { WorkshopSettingsModal } from '../modals/workshopSettings'

export const PresentationWorkshopCard = () => {
  const { auth } = useAuth()
  const [isOpenConfig, setOpenConfig] = useState<boolean>(false)

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

      {auth?.isAdmin && (
        <UiTooltip label='Configuraciones'>
          <button onClick={() => setOpenConfig(true)} className='transition hover:rotate-12'>
            <IoIosSettings className='text-6xl text-gray-700' />
          </button>
        </UiTooltip>
      )}

      {isOpenConfig && (
        <WorkshopSettingsModal setOpen={setOpenConfig} />
      )}
    </div>
  )
}