import { User } from '@/interfaces'
import { UserStatusText } from './statusUser'

interface UserItemProps {
  user: User
  onEdit?: (user: User) => void
  onStatusToggle?: (user: User) => void
}

export const UserItem = ({ user, onStatusToggle, onEdit }: UserItemProps) => {
  return (
    <div className='flex items-center p-3 rounded bg-gray-50 gap-4'>
      <div className='flex flex-col flex-1'>
        <p className='text-md font-bold'>{user.name}</p>
        <p className='text-md'>{user.email}</p>
        <UserStatusText status={user.status} />
      </div>
      <div className='flex gap-2'>
        <button className='bg-white p-2 border rounded transition hover:shadow' onClick={() => onEdit?.(user)}>Editar</button>
        {user.status === 'active' && (
          <button className='bg-rose-800 text-white p-2 rounded transition hover:shadow' onClick={() => onStatusToggle?.(user)}>Desactivar</button>
        )}
        {(user.status === 'blocked' || user.status === 'inactive') && (
          <button className='bg-green-700 text-white p-2 rounded transition hover:shadow' onClick={() => onStatusToggle?.(user)}>Activar</button>
        )}
      </div>
    </div>
  )
}
