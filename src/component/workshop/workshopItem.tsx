import { User, WorkshopPropierties } from '@/interfaces'

interface UserItemProps {
  user: User
  onEdit?: (userId: string) => void
  onDelete?: (userId: string) => void
}

const UserItem = ({ user, onDelete, onEdit }: UserItemProps) => {
  return (
    <div className='flex items-center p-3 rounded bg-gray-50 gap-4'>
      <div className='flex flex-col flex-1'>
        <p className='text-md font-bold'>{user.name}</p>
        <p className='text-md'>{user.email}</p>
      </div>
      <div className='flex gap-2'>
        <button className='bg-white p-2 border rounded transition hover:shadow' onClick={() => onEdit?.(user._id)}>Editar</button>
        <button className='bg-red-700 text-white p-2 rounded transition hover:shadow' onClick={() => onDelete?.(user._id)}>Desactivar</button>
      </div>
    </div>
  )
}

interface Props {
  workshop: WorkshopPropierties
}

export const WorkShopItem = ({ workshop }: Props) => {
  return (
    <div className='flex flex-col gap-8 p-5 rounded-lg border'>
      <div>
        <p className='text-xl font-bold'>{workshop.name}</p>
        <p className='text-sm text-gray-500'>{workshop.slogan}</p>
      </div>
      <div className='flex flex-col gap-4'>
        {workshop.users?.map(user => <UserItem user={user} key={crypto.randomUUID()} />)}
        {workshop.users?.length == 0 && <p className='text-sm text-gray-400'>No hay usuarios</p>}
        <div className='flex justify-center'>
          <button className='px-4 py-2 bg-gray-700 text-white rounded'>Nuevo Usuario</button>
        </div>
      </div>
    </div>
  )
}