interface Props {
  status: 'active' | 'inactive' | 'blocked'
}

export const UserStatusText = ({ status }: Props) => {  
  return (
    <div className='flex items-center gap-2'>
      {status === 'active' && (
        <div className='flex items-center gap-2'>
          <div className='w-3 h-3 rounded-full bg-green-500' />
          <span className='text-sm font-medium text-foreground'>Activo</span>
        </div>
      )}

      {status === 'inactive' && (
        <div className='flex items-center gap-2'>
          <div className='w-3 h-3 rounded-full bg-yellow-500' />
          <span className='text-sm font-medium text-foreground'>Inactivo</span>
        </div>
      )}

      {status === 'blocked' && (
        <div className='flex items-center gap-2'>
          <div className='w-3 h-3 rounded-full bg-red-500' />
          <span className='text-sm font-medium text-foreground'>Bloqueado</span>
        </div>
      )}
    </div>
  )
}
