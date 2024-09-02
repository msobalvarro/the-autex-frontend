import { useState } from 'react'
import { CustomModal, ModalMinimalProps } from './layout'
import { InputField } from '../ui/input'
import { MdTaskAlt } from 'react-icons/md'
import { InputAddNewActivity } from '../estimate/inputAddNewActivity'

export const ActivitiesModal = ({ setOpen }: ModalMinimalProps) => {
  const [activities, setActivities] = useState<string[]>([])

  return (
    <CustomModal
      isOpen
      medium
      setOpen={setOpen}
      title='Nuevo grupo de actividad'
      subTitle='Crea grupo de actividades para aplicarlas en el presupuesto'
      containerClassesNames='flex flex-col gap-2'
      navButtonsOptions={{
        isFinally: true,
        createText: 'Crear Grupo',
        onBackClick: () => setOpen(false),
        renderBack: false,
        renderNext: false,
      }}>
      <div className='flex flex-col gap-4'>
        <InputAddNewActivity onPush={act => setActivities(l => ([...l, act]))} />
        {activities.length === 0 && (
          <div className='flex items-center p-5 bg-gray-50 rounded justify-between'>
            <div className='flex flex-col'>
              <p className='text-lg text-gray-700'>Aqui apareceran tus actividades</p>
              <p className='text-sm text-gray-500'>Agrega nuevas actividades</p>
            </div>

            <MdTaskAlt className='text-4xl text-green-500' />
          </div>
        )}

        {
          activities.length > 0 && (
            <ol className='my-2 p-5 bg-gray-50 rounded'>
              {activities.map(activity => (
                <li className='flex items-center border-b border-gray-200 gap-2 py-2 my-1' key={crypto.randomUUID()}>
                  <MdTaskAlt className='text-xl text-gray-500' />
                  <p className='text-gray-600'>{activity}</p>
                </li>
              ))}
            </ol>
          )
        }

        <hr />

        <div className='flex gap-2'>
          <label className='flex flex-col flex-1'>
            <InputField placeholder='ingrese un nombre' />
            <span className='text-gray-600 ml-2'>Nombre Grupo de actividad</span>
          </label>

          <label className='flex flex-col'>
            <InputField placeholder='ingrese un precio' />
            <span className='text-gray-600 ml-2'>Precio Total</span>
          </label>
        </div>
      </div>
    </CustomModal>
  )
}