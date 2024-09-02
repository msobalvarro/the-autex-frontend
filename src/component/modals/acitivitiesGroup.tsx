import { useState } from 'react'
import { CustomModal, ModalMinimalProps } from './layout'
import { InputField } from '../ui/input'
import { MdTaskAlt } from 'react-icons/md'
import { InputAddNewActivity } from '../estimate/inputAddNewActivity'
import { useValidation } from '@/hooks/validations'
import { toast } from 'react-toastify'
import { axiosInstance } from '@/utils/http'
import { Endpoints } from '@/router'
import { Loader } from '../ui/loader'

export const ActivitiesModal = ({ setOpen }: ModalMinimalProps) => {
  const { validateNumber } = useValidation()
  const [loading, setLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [activities, setActivities] = useState<string[]>([])

  const submit = async () => {
    setLoading(true)
    
    try {
      if (activities.length === 0) {
        throw new Error('las actividades son requeridas')
      }
      if (name.trim().length < 3) {
        throw new Error('Ingrese un nombre')
      }

      if (price === 0) {
        throw new Error('Ingrese un precio')
      }

      const { data, status } = await axiosInstance.post(Endpoints.CREATE_ACTIVITIES_GROUP_ESTIMATION, {
        activities,
        name,
        price
      })

      if (status !== 200) {
        throw new Error(data)
      }

      toast.info(`Grupo ${name} creado, ya puedes utilizarlo en el presupuesto`)
      setOpen(false)
      
    } catch (error) {
      toast.error(String(error))
    } finally { 
      setLoading(false)
    }
  }

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
        onSuccess: submit,
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

        {activities.length > 0 && (
          <ol className='my-2 p-5 bg-gray-50 rounded'>
            {activities.map(activity => (
              <li className='flex items-center border-b border-gray-200 gap-2 py-2 my-1' key={crypto.randomUUID()}>
                <MdTaskAlt className='text-xl text-gray-500' />
                <p className='text-gray-600'>{activity}</p>
              </li>
            ))}
          </ol>
        )}

        <hr />

        <div className='flex gap-2'>
          <label className='flex flex-col flex-1'>
            <InputField
              value={name}
              onChange={({ currentTarget }) => setName(currentTarget.value)}
              placeholder='ingrese un nombre' />
            <span className='text-gray-600 ml-2'>Nombre Grupo de actividad *</span>
          </label>

          <label className='flex flex-col'>
            <InputField
              value={String(price)}
              onChange={({ currentTarget }) =>
                validateNumber(currentTarget.value)
                && setPrice(Number(currentTarget.value))}
              placeholder='ingrese un precio' />
            <span className='text-gray-600 ml-2'>Precio Total *</span>
          </label>
        </div>

        <Loader active={loading} />
      </div>
    </CustomModal>
  )
}