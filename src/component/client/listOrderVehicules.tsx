import { Client, Vehicule } from '@/interfaces'
import { IoCarSportSharp } from 'react-icons/io5'
import { useState } from 'react'
import { NewVehicule } from '../modals/newVehicule'
import { VehiculeItemClient } from './vehiculeItem'
import { NewEstimation } from '../modals/newEstimation'

interface Props {
  vehicules: Vehicule[]
  client: Client
  refetch: () => void
}

export const ClientVehiculeList = ({ vehicules, client, refetch }: Props) => {
  const [vehiculeForEstimation, setVehicule] = useState<Vehicule | null>(null)
  const [openNewEstimation, setOpenEstimation] = useState<boolean>(false)
  const [openNewVehicule, setOpenVehicule] = useState<boolean>(false)

  const openEstimation = (vehicule: Vehicule) => {
    setVehicule(vehicule)
    setOpenEstimation(true)
  }

  return (
    <div className='flex flex-col w-2/5 gap-2'>
      <div className='flex items-center justify-between'>
        <p className='text-xl text-gray-600 ml-4 flex items-center gap-4'>
          <IoCarSportSharp className='text-xl' />
          Vehículos
        </p>

        <button onClick={() => setOpenVehicule(true)} className='px-2 py-1 bg-gray-600 text-white rounded'>Agregar vehiculo</button>
      </div>

      <hr />

      <div className='flex flex-col'>
        {vehicules.map(vehicule => (
          <VehiculeItemClient
            key={crypto.randomUUID()}
            onCreateEstimate={() => openEstimation(vehicule)}
            vehicule={vehicule} />
        ))}

        {vehicules.length === 0 && (
          <p className='text-gray-400 text-xl p-5'>No hay Ordenes</p>
        )}
      </div>
      {openNewEstimation && <NewEstimation client={client} vehicule={vehiculeForEstimation} isOpen setOpen={setOpenEstimation} />}
      {openNewVehicule && <NewVehicule onUpdate={refetch} client={client} setOpen={setOpenVehicule} />}
    </div>
  )
}
