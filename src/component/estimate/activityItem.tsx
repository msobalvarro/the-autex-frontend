import { ActivitiesGroupPropierties } from '@/interfaces'
import { IoCheckmarkOutline } from 'react-icons/io5'


interface Props {
  activity: ActivitiesGroupPropierties
}

export const ActivityItem = ({ activity }: Props) => {
  return (
    <div className='bg-gray-50 overflow-hidden'>
      <div className='p-4 md:p-6 border-b'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-medium'>{activity.name}</h3>
        </div>
      </div>

      <div className='p-4 md:p-6 space-y-4'>
        {activity.activities.map(act => (
          <div className='flex items-start gap-4'>
            <div className='shrink-0 mt-1'>
              <IoCheckmarkOutline className='w-5 h-5 text-muted-foreground' />
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>{act}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}