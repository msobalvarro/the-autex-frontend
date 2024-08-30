import { User, WorkshopPropierties } from '@/interfaces'

interface UserItemProps {
  user: User
  onEdit?: (userId: string) => void
  onDelete?: (userId: string) => void
}

const UserItem = ({ user, onDelete, onEdit }: UserItemProps) => {
  return (
    <div className='flex items-center p-3 rounded bg-gray-100'>
      <div className='flex flex-col'>
        <p className='text-md'>{user.name}</p>
        <p className='text-md'>{user.email}</p>
      </div>
      <div className='flex'>
        <button onClick={() => onEdit?.(user._id)}>Editar</button>
        <button onClick={() => onDelete?.(user._id)}>Desactivar</button>
      </div>
    </div>
  )
}

interface Props {
  workshop: WorkshopPropierties
}

export const WorkShopItem = ({ workshop }: Props) => {
  return (
    <div className='flex flex-col gap-8'>
      <div>
        <p className='text-xl font-bold'>{workshop.name}</p>
        <p className='text-sm text-gray-500'>{workshop.slogan}</p>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-xl'>Usuarios</p>

        {workshop.users?.map(user => <UserItem user={user} key={crypto.randomUUID()} />)}
      </div>
    </div>
  )
}