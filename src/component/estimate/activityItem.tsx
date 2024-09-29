import { ActivitiesGroupPropierties } from '@/interfaces'
import { useEffect, useState } from 'react'
import { IoCheckmarkOutline } from 'react-icons/io5'
import { MdModeEdit } from 'react-icons/md'
import { InputAddNewActivity } from './inputAddNewActivity'
import { v4 } from 'uuid'
import { FaRegTrashAlt } from 'react-icons/fa'
import { axiosInstance } from '@/utils/http'
import { Endpoints } from '@/router'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { Loader } from '../ui/loader'

interface Props {
  activity: ActivitiesGroupPropierties
  onUpdate?: () => void
}

export const ActivityItem = ({ activity, onUpdate }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [customActivities, setActivities] = useState<string[]>([...activity.activities])
  const [isEditMode, toggleEditMode] = useState<boolean>(false)

  useEffect(() => {
    setActivities(activity.activities)
  }, [activity.activities])

  const cancel = () => {
    toggleEditMode(false)
    setActivities(activity.activities)
  }

  const pushActivity = (activity: string) => {
    setActivities([...customActivities, activity])
  }

  const deleteActivity = (activity: string) => {
    setActivities(customActivities.filter(act => act !== activity))
  }

  const save = async () => {
    setLoading(true)
    
    try {
      await axiosInstance.post(Endpoints.UPDATE_ACTIVITY_LIST, {
        activityId: activity._id,
        activities: customActivities
      })

      toast.info('grupo actualizado')
      await onUpdate?.()
      toggleEditMode(false)
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data)
      } else {
        toast.error(String(error))
      }
    } finally { 
      setLoading(false)
    }
  }
  2
  return (
    <div className='flex flex-col bg-gray-100 rounded relative'>
      <div className='p-4 md:p-4 border-b'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-medium text-sky-700'>{activity.name}</h3>


          {isEditMode && (
            <div className='flex items-center gap-2'>
              <button onClick={cancel} className='text-xs text-white rounded-full bg-rose-800 py-1 px-2'>
                Cancelar
              </button>

              {customActivities !== activity.activities && (
                <button onClick={save} className='text-xs text-gray-500 rounded-full transition bg-gray-200 hover:bg-gray-300 py-1 px-2'>
                  Guardar
                </button>
              )}
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
        {customActivities.map(act => (
          <div className='flex items-center gap-2' key={v4()}>
            {isEditMode && (
              <button onClick={() => deleteActivity(act)} className='p-2 rounded-full text-lg hover:bg-gray-200'>
                <FaRegTrashAlt className='text-rose-800' />
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

      <Loader active={loading} />
    </div>
  )
}