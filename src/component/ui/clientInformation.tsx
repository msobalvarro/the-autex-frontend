import { FaUserCheck } from 'react-icons/fa'
import { Client } from '@/interfaces'

interface Props {
  client: Client
}

export const ClientInformation = ({ client }: Props) => {
  return (
    <article className='flex flex-col p-4 gap-8 bg-white rounded shadow-md w-1/4'>
      <FaUserCheck color='#CCC' className='text-8xl text-gray--400 self-center' />
      
      <div className='flex flex-col gap-2 text-gray-600 px-6'>
        <p className='text-xl font-bold'>{client.name}</p>
        <a href={`mailto:${client.email}`} className='text-blue-500 hover:underline'>{client.email}</a>
        <p className=''>{client.phoneNumber}</p>
        <p className=''>Vehiculos: {client.vehicules.length}</p>
        <p className=''>Tipo: {client.type.toUpperCase()}</p>
      </div>

      <button className='p-2 bg-gray-600 rounded text-white'>Editar</button>
    </article>
  )
}