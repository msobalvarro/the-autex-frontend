import clsx from 'clsx'

interface Props {
  status: 'pending' | 'process' | 'finished' | 'canceled'
}

export const StatusOrder = ({ status }: Props) => {
  return (
    <div className='flex'>
      <div className={`px-2 uppercase text-sm border rounded-xl ${clsx({
        'border-yellow-400 text-yellow-400': status === 'pending',
        'border-blue-400 text-blue-400': status === 'process',
        'border-green-600 text-green-600': status === 'finished',
        'border-rose-400 text-rose-400': status === 'canceled',
      })}`}>
        <p className={`font-bold`}>
          {status === 'pending' && 'pendiente'}
          {status === 'finished' && 'finalizada'}
          {status === 'process' && 'en proceso'}
          {status === 'canceled' && 'cancelada'}
        </p>
      </div>
    </div>
  )
}
