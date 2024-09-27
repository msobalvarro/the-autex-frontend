import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover'
import { Vehicule } from '@/interfaces'
import { VehiculePlate } from '@/component/vehicule/plate'
import { RiCalculatorFill } from 'react-icons/ri'
import { v4 } from 'uuid'

interface Props {
  vehicule: Vehicule
  onCreateEstimate: () => void
}

export const VehiculeItemClient = ({ vehicule, onCreateEstimate }: Props) => {
  return (
    <Popover placement='right'>
      <PopoverTrigger>
        <div className='flex rounded gap-2 flex-col cursor-pointer p-2 transition hover:bg-gray-100' key={v4()}>
          <div className='flex justify-between items-center'>
            <p className='text-xl text-gray-800'>
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
      </PopoverTrigger>
      <PopoverContent className='bg-white p-0 rounded'>
        <div className='flex p-4 flex-col gap-2 shadow-xl'>
          <div className='text-small text-gray-500 px-4'>Selecciona una Opción</div>
          <hr />
          <div onClick={onCreateEstimate} className='flex gap-2 cursor-pointer items-center rounded p-2 hover:bg-gray-100'>
            <RiCalculatorFill className='text-gray-600' size={24} />
            Generar Presupuesto
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}