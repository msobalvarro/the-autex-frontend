import clsx from 'clsx'

interface Props {
  status: 'active' | 'inactive' | 'blocked'
}

export const StatusUser = ({ status }: Props) => {
  return (
    <div className='flex '>
      <div className={`px-2 uppercase justify-self-auto	 text-sm border rounded-xl ${clsx({
        'border-green-500 text-green-500': status === 'active',
        'border-gray-500 text-gray-500': status === 'inactive',
        'border-red-500 text-gray-500': status === 'blocked',
      })}`}>
        <p className={`font-bold`}>
          {status === 'active' && 'activo'}
          {status === 'blocked' && 'bloqueado'}
          {status === 'inactive' && 'inactivo'}
        </p>
      </div>
    </div>
  )
}
