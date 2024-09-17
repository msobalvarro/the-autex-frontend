import clsx from 'clsx'

interface Props {
  status: 'active' | 'inactive' | 'blocked'
}

export const StatusUser = ({ status }: Props) => {
  return (
    <div className={`px-2 uppercase text-sm border rounded-xl ${clsx({
      'border-green-400 text-green-400': status === 'active',
      'border-gray-400 text-gray-400': status === 'inactive',
      'border-red-400 text-gray-400': status === 'blocked',
    })}`}>
      <p className={`font-bold`}>
        {status === 'active' && 'activo'}
        {status === 'blocked' && 'bloqueado'}
        {status === 'inactive' && 'inactivo'}
      </p>
    </div>
  )
}
