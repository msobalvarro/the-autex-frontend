import { CreateUserProps, User, WorkshopPropierties } from '@/interfaces'
import { ModalMinimalProps, CustomModal } from './layout'
import { useState } from 'react'
import { Loader } from '../loader'
import { InputField } from '../input'
import { toast } from 'react-toastify'
import { useValidation } from '@/hooks/validations'
import { axiosInstance } from '@/utils/http'
import { Endpoints } from '@/router'

interface Props extends ModalMinimalProps {
  workshop: WorkshopPropierties | null
  defaultData?: User | null
}
export const NewAndUpdateUserModal = ({ setOpen, workshop, onUpdate, defaultData }: Props) => {
  const { validateEmail } = useValidation()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<CreateUserProps>({
    name: defaultData ? defaultData.name : '',
    email: defaultData ? defaultData.email : '',
    password: '',
  })

  const submit = async () => {
    setLoading(true)

    try {
      if (data.name.length < 3) {
        throw new Error('Ingrese un nombre válido')
      }
      if (!validateEmail(data.email)) {
        throw new Error('Correo incorrecto')
      }
      if (!defaultData && data.password.length < 6) {
        throw new Error('La contraseña debe contener al menos 6 dīgitos')
      }

      if (defaultData) {
        const { data: dataResponse, status } = await axiosInstance.put(Endpoints.UPDATE_USER, {
          email: data.email,
          name: data.name,
          _id: defaultData._id
        })

        if (status !== 200) {
          throw new Error(dataResponse)
        }

      } else {
        const { data: dataResponse, status } = await axiosInstance.post(Endpoints.CREATE_USER_ASSIGN_WORKSHOP, {
          workshopId: workshop?._id,
          ...data,
        })

        if (status !== 200) {
          throw new Error(dataResponse)
        }
      }

      setOpen(false)
      onUpdate?.()
      toast.info(`${data.name} ${defaultData ? 'actualizado' : 'creado'}`)
    } catch (error) {
      toast.error(String(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <CustomModal
      title={defaultData ? `Actualizar ${defaultData.name}` : `Nuevo Usuario para ${workshop?.name}`}
      subTitle={defaultData ? 'Actualizar Usuario' : 'Nuevo usuario para la empresa'}
      small
      isOpen
      hiddenButtons
      setOpen={setOpen}>
      <div className='flex flex-col flex-1 text-gray-600 gap-4'>
        <label className='flex flex-col gap-1'>
          <InputField
            value={data.name}
            onChange={({ currentTarget }) => setData({ ...data, name: currentTarget.value })}
            placeholder='Ingrese un nombre' />
          <span className='ml-2'>Nombre *</span>
        </label>

        <label className='flex flex-col gap-1'>
          <InputField
            value={data.email}
            onChange={({ currentTarget }) => setData({ ...data, email: currentTarget.value })}
            type='email'
            placeholder='Ingrese un correo electrónico' />
          <span className='ml-2'>Correo electrónico *</span>
        </label>

        {!defaultData && (
          <label className='flex flex-col gap-1'>
            <InputField
              value={data.password}
              onChange={({ currentTarget }) => setData({ ...data, password: currentTarget.value })}
              placeholder='Ingrese una contraseña'
              type='password' />
            <span className='ml-2'>Contraseña *</span>
          </label>
        )}

        <label>

        </label>

        <button disabled={isLoading} onClick={submit} className='py-2 px-3 mt-4 rounded bg-gray-600 text-white text-bold self-end'>
          {defaultData ? 'Actualizar Usuario' : 'Crear Usuario'}
        </button>

        <Loader active={isLoading} />
      </div>
    </CustomModal>
  )
}
