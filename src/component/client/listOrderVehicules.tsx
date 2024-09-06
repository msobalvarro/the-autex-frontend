import { Vehicule } from '@/interfaces'
import { VehiculePlate } from '../vehicule/plate'
import { IoCarSportSharp } from 'react-icons/io5'

interface Props {
  vehicules: Vehicule[]
}

export const ClientVehiculeList = ({ vehicules }: Props) => {

  return (
    <div className='flex flex-col w-2/5 gap-2'>
      <p className='text-xl text-gray-600 ml-4 flex items-center gap-4'>
        <IoCarSportSharp className='text-xl' />
        Vehículos
      </p>

      <div className='flex flex-col'>
        {vehicules.map(vehicule => (
          <div className='flex gap-2 flex-col cursor-pointer p-2 transition hover:bg-gray-100' key={crypto.randomUUID()}>
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
    </div>
  )
}
