import { CustomModal, ModalMinimalProps } from '@/component/modals/layout'
import { CustomSelectOption } from '../selection'

export const NewEstimation = ({ setOpen, isOpen }: ModalMinimalProps) => {

  return (
    <CustomModal isOpen={isOpen} setOpen={setOpen}>
      <div className='container min-w-84 flex flex-col gap-8'>
        <div className='w-full'>
          <p className='text-xl'>Nuevo Presupuesto</p>
          <p className='text-sm text-gray-500'>Crea nuevo presupuesto para un cliente</p>
        </div>

        <div className='flex flex-row'>
          <CustomSelectOption data={[{ label: 'test', value: 'test' }]} />
          <CustomSelectOption data={[{ label: 'test', value: 'test' }]} />
        </div>
      </div>
    </CustomModal>
  )
}
