import { UserPropierties, WorkshopPropierties } from '@/interfaces'
import { FaPlus } from 'react-icons/fa6'
import { UserItem } from './userItem'

interface Props {
  workshop: WorkshopPropierties
  onNewUser: (workshop: WorkshopPropierties) => void
  onUpdateUser?: (user: UserPropierties) => void
  onActiveOrInactive?: (user: UserPropierties) => void
}

export const WorkShopItem = ({ workshop, onNewUser, onActiveOrInactive, onUpdateUser }: Props) => {
  return (
    <div className='flex flex-col gap-8 p-5 rounded-lg border'>      
      <div>
        <p className='text-xl font-bold'>{workshop.name}</p>
        <p className='text-sm text-gray-500'>{workshop.slogan}</p>
      </div>
      <div className='flex flex-col gap-4'>
        {workshop.users?.map(user => <UserItem onStatusToggle={onActiveOrInactive} onEdit={onUpdateUser} user={user} key={crypto.randomUUID()} />)}
        {workshop.users?.length == 0 && <p className='text-sm text-gray-400'>No hay usuarios</p>}
        <div className='flex'>
          <button onClick={() => onNewUser(workshop)} className='px-4 py-2 bg-gray-700 text-white rounded flex items-center gap-2'>
            <FaPlus />
            Nuevo Usuario
          </button>
        </div>
      </div>
    </div>
  )
}