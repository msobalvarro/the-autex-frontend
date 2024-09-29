import { ActivitiesGroupPropierties } from '@/interfaces'
import { useState } from 'react'
import { IoCheckmarkOutline } from 'react-icons/io5'
import { MdModeEdit } from 'react-icons/md'
import { InputAddNewActivity } from './inputAddNewActivity'
import { FcEmptyTrash } from 'react-icons/fc'


interface Props {
  activity: ActivitiesGroupPropierties
  onUpdate?: () => void
}

export const ActivityItem = ({ activity }: Props) => {
  const [isEditMode, toggleEditMode] = useState<boolean>(false)

  const pushActivity = (activity: String) => {

  }

  const save = async () => {
    try {
      // await axiosInstance.post(Endpoints.)
    } catch (error) {

    }
  }

  return (
    <div className='flex flex-col bg-gray-100 rounded'>
      <div className='p-4 md:p-4 border-b'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-medium text-sky-700'>{activity.name}</h3>


          {isEditMode && (
            <div className='flex items-center gap-2'>
              <button onClick={() => toggleEditMode(false)} className='text-xs text-white rounded-full bg-rose-800 py-1 px-2'>
                Cancelar
              </button>

              <button onClick={save} className='text-xs text-gray-500 rounded-full transition bg-gray-200 hover:bg-gray-300 py-1 px-2'>
                Guardar
              </button>
            </div>
          )}

          {!isEditMode && (
            <button onClick={() => toggleEditMode(true)} className='text-lg text-gray-500 rounded-full transition hover:bg-gray-200 p-2'>
              <MdModeEdit />
            </button>
          )}
        </div>
      </div>

      <div className='p-4 md:p-6 space-y-4'>
        {activity.activities.map(act => (
          <div className='flex items-start gap-4'>
            {isEditMode && (
              <button>
                <FcEmptyTrash />
              </button>
            )}

            {!isEditMode && (
              <div className='shrink-0 mt-1'>
                <IoCheckmarkOutline className='w-5 h-5 text-muted-foreground' />
              </div>
            )}


            <div>
              <p className='text-sm text-muted-foreground'>{act}</p>
            </div>
          </div>
        ))}
      </div>

      {isEditMode && (
        <div className='p-2'>
          <InputAddNewActivity small onPush={pushActivity} />
        </div>
      )}
    </div>
  )
}