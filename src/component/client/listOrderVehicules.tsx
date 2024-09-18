import { Client, Vehicule } from '@/interfaces'
import { VehiculePlate } from '../vehicule/plate'
import { IoCarSportSharp } from 'react-icons/io5'
import { useState } from 'react'
import { NewVehicule } from '../modals/newVehicule'

interface Props {
  vehicules: Vehicule[]
  client: Client
  refetch: () => void
}

export const ClientVehiculeList = ({ vehicules, client, refetch }: Props) => {
  const [openNewVehicule, setOpen] = useState<boolean>(false)

  return (
    <div className='flex flex-col w-2/5 gap-2'>
      <div className='flex items-center justify-between'>
        <p className='text-xl text-gray-600 ml-4 flex items-center gap-4'>
          <IoCarSportSharp className='text-xl' />
          Vehículos
        </p>

        <button onClick={() => setOpen(true)} className='px-2 py-1 bg-gray-600 text-white rounded'>Agregar vehiculo</button>
      </div>

      <hr />

      <div className='flex flex-col'>
        {vehicules.map(vehicule => (
          <div className='flex rounded gap-2 flex-col cursor-pointer p-2 transition hover:bg-gray-100' key={crypto.randomUUID()}>
            <div className='flex justify-between items-center'>
              <p className='text-xl'>
                {`
                  ${vehicule?.year} 
                  ${vehicule?.brand?.description} 
                  ${vehicule?.model?.description}
                `}
              </p>

              <VehiculePlate plate={String(vehicule?.plate)} />
            </div>
            <div className='flex justify-between gap-4 text-gray-500 uppercase text-sm'>
              <span>Unidad de tipo {vehicule.type}</span>
              <span>Color {vehicule.color}</span>
            </div>
          </div>
        ))}

        {vehicules.length === 0 && (
          <p className='text-gray-400 text-xl p-5'>No hay Ordenes</p>
        )}
      </div>
      {openNewVehicule && <NewVehicule onUpdate={refetch} client={client} setOpen={setOpen} />}
    </div>
  )
}
