import { createPortal } from 'react-dom'
import { CustomModal, ModalMinimalProps } from './layout'
import { IoSettings } from 'react-icons/io5'

export const WorkshopSettingsModal = ({ setOpen, onUpdate }: ModalMinimalProps) => {
  return (
    createPortal(
      (
        <CustomModal
          isOpen
          setOpen={setOpen}
          title='Configuraciones'
          subTitle='Administra las configuraciones de tu taller'
          containerClassesNames='flex flex-col gap-4'
          navButtonsOptions={{
            createText: 'Guardar',
            isFinally: true,
            renderBack: false,
          }}
          iconComponent={<IoSettings size={24} />}>
          <label>
            <input type='checkbox' />

            <p>Cuota Fija en la Factura</p>
          </label>
        </CustomModal>
      ),
      document.body
    )
  )
}