import { WorkshopPropierties } from '@/interfaces'
import { ModalMinimalProps, CustomModal } from './layout'

interface Props extends ModalMinimalProps {
  workshop: WorkshopPropierties
}
export const NewUserModal = ({ setOpen, workshop }: Props) => {
  return (
    <CustomModal
      title={`Nuevo Usuario para ${workshop.name}`}
      subTitle='Nuevo usuario para la empresa'
      isOpen
      hiddenButtons
      setOpen={setOpen}>
      <div className='flex flex-col flex-1'>

      </div>
    </CustomModal>
  )
}
