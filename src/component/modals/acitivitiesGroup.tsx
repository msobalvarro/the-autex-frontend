import { CustomModal, ModalMinimalProps } from './layout'

export const ActivitiesModal = ({ setOpen }: ModalMinimalProps) => {
  return (
    <CustomModal
      isOpen
      hiddenButtons
      setOpen={setOpen}
      title='Nuevo grupo de actividad'
      subTitle='Crea grupo de actividades para aplicarlas en el presupuesto'
      containerClassesNames='flex flex-col gap-2'
      navButtonsOptions={{
        isFinally: false,
        onBackClick: () => setOpen(false),
        renderBack: true,
        renderNext: false,
        backText: 'Cerrar'
      }}>
      <p>Grupo de actividades</p>
    </CustomModal>
  )
}