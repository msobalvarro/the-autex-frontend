import { CustomModal, ModalMinimalProps } from './layout'
import { FaUserGroup } from 'react-icons/fa6'
import { createPortal } from 'react-dom'

interface ItemCheckPros {
  label: string
  checked: boolean
  onChange: () => void
}

const ItemCheck = ({ label }: ItemCheckPros) => {
  return (
    <label className='flex items-center pl-2 border-l-2 gap-1 border-gray-200'>
      <input type='checkbox' />
      <span className='text-gray-600'>{label}</span>
    </label>
  )
}

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
          <div className='flex flex-col gap-2'>
            <p className='text-xl text-gray-700'>Gestion Preliminares</p>

            <div className='flex items-center justify-between'>
              <ItemCheck label='Diganosticado / Comprobado' checked onChange={() => { }} />
              <ItemCheck label='KOEO / KOER' checked onChange={() => { }} />
              <ItemCheck label='Estacionado' checked onChange={() => { }} />
              <ItemCheck label='En movimiento' checked onChange={() => { }} />
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-xl text-gray-700'>Tipos de Actividades</p>

            <div className='flex items-center justify-between'>
              <ItemCheck label='Servicio' checked onChange={() => { }} />
              <ItemCheck label='Mantenimiento' checked onChange={() => { }} />
              <ItemCheck label='Menor' checked onChange={() => { }} />
              <ItemCheck label='Mayor' checked onChange={() => { }} />
              <ItemCheck label='Predictivo' checked onChange={() => { }} />
              <ItemCheck label='Preventivo' checked onChange={() => { }} />
              <ItemCheck label='Correctivo' checked onChange={() => { }} />
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-xl text-gray-700'>Servicio</p>

            <div className='flex items-center justify-between'>
              <ItemCheck label='Mecánico' checked onChange={() => { }} />
              <ItemCheck label='Eléctrico' checked onChange={() => { }} />
              <ItemCheck label='Electrómecanico' checked onChange={() => { }} />
              <ItemCheck label='Electrónico' checked onChange={() => { }} />
              <ItemCheck label='Multiple' checked onChange={() => { }} />
              <ItemCheck label='Externo' checked onChange={() => { }} />
            </div>
          </div>
        </>
      </CustomModal>
    ),
    document.body
  )
}