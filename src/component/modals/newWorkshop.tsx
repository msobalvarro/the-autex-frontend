import { InputField } from '@/component/input'
import { CustomModal, ModalMinimalProps } from './layout'

export const NewWorkshopModal = ({ setOpen }: ModalMinimalProps) => {
  return (
    <CustomModal
      isOpen
      small
      title='Nuevo Taller'
      subTitle='Agrega nuevo taller y administra sus usuarios'
      setOpen={setOpen}>
      <div className='flex flex-col flex-1 gap-4'>
        <label className='flex-1 flex flex-col'>
          <InputField className='flex-1' />
          <p className='text-sm'>Nombre del Taller</p>
        </label>
        <label className='flex-1 flex flex-col'>
          <InputField className='flex-1' />
          <p className='text-sm'>Ubicación</p>
        </label>
        <label className='flex-1 flex flex-col'>
          <InputField className='flex-1' />
          <p className='text-sm'>Nombre del Representante</p>
        </label>
        <label className='flex-1 flex flex-col'>
          <InputField className='flex-1' />
          <p className='text-sm'>Telefono del Representante</p>
        </label>

        <button className='p-2 bg-gray-700 rounded text-white mt-4'>Crear Nuevo Taller</button>
      </div>
    </CustomModal>
  )
}