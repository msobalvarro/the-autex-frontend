import { FaUserAstronaut } from 'react-icons/fa6'
import { Client } from '@/interfaces'
import dayjs from 'dayjs'

interface Props {
  client: Client
}

export const ClientInformation = ({ client }: Props) => {
  return (
    <article className='flex flex-col p-4 gap-8 bg-white rounded-xl mt-10 shadow-md w-1/4'>
      <FaUserAstronaut className='text-8xl text-gray-300 self-center' />

      <div className='flex flex-col gap-2 text-gray-600 px-6'>
        <p className='text-xl font-bold text-center'>{client.name}</p>

        <hr className='my-2' />
        <p>
          Correo: <a href={`mailto:${client.email}`} className='text-sky-600 hover:underline'>{client.email}</a>
        </p>
        <p className=''>
          Numero de Celular: {client.phoneNumber}
        </p>
        <p className=''>Vehiculos Registrados: {client.vehicules.length}</p>

        <hr className='my-2' />

        <p className=''>Fecha de registro: {dayjs(client.createdAt).format('ll')}</p>
        <p className='text-sm text-gray-400'>Registrado {dayjs(client.createdAt).fromNow()}</p>
      </div>

      <button className='p-2 bg-gray-600 rounded text-white'>Editar</button>
    </article>
  )
}