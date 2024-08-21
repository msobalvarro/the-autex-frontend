import { CustomModal, ModalMinimalProps } from './layout'
import { FaUserGroup } from 'react-icons/fa6'
import { createPortal } from 'react-dom'

export const NewOrderService = ({ setOpen }: ModalMinimalProps) => {
  return createPortal(
    (
      <CustomModal
        isOpen={true}
        setOpen={setOpen}
        title='Genera una nueva orden'
        subTitle='Genera una orden apartir de un presupuesto ya creado'
        containerClassesNames='flex flex-col gap-8'
        navButtonsOptions={{
          onBackClick: () => setOpen(false),
          // onSuccess: onSubmit,
          isFinally: true,
          renderBack: false,
          backText: 'Cerrar'
        }}
        iconComponent={<FaUserGroup />}>
        <>


        </>
      </CustomModal>
    ),
    document.body
  )
}