import { InputField } from '@/component/ui/input'
import { CustomModal, ModalMinimalProps } from './layout'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { Loader } from '../ui/loader'
import { axiosInstance } from '@/utils/http'
import { Endpoints } from '@/router'
import { WorkshopStateProps } from '@/interfaces'

export const NewWorkshopModal = ({ setOpen, onUpdate }: ModalMinimalProps) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<WorkshopStateProps>({
    location: '',
    name: '',
    phoneNumber: '',
    representative: '',
    slogan: '',
  })

  const submit = async () => {
    setLoading(true)
    try {
      if (data.location.length < 3) {
        throw new Error('Ingrese una ubicación correcta')
      }
      if (data.name.length < 3) {
        throw new Error('Ingrese un nombre de taller correcto')
      }
      if (data.representative.length < 3) {
        throw new Error('Ingrese un nombre de representante correcto')
      }
      if (data.phoneNumber.length < 8) {
        throw new Error('Ingrese un numero telelónico correcto')
      }

      const response = await axiosInstance.post(Endpoints.CREATE_WORKSHOP, data)
      if (response.status !== 200) {
        console.log(response.data)
        throw new Error(response.data)
      }

      setOpen(false)
      onUpdate?.()

      toast.success('Nuevo taller creado')
    } catch (error: any) {
      // console.log(error)
      toast.error(String(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <CustomModal
      isOpen
      small
      title='Nuevo Taller'
      subTitle='Agrega nuevo taller y administra sus usuarios'
      setOpen={setOpen}>
      <div className='flex flex-col flex-1 gap-4'>
        <label className='flex-1 flex flex-col'>
          <InputField
            value={data.name}
            onChange={({ currentTarget }) => setData({ ...data, name: currentTarget.value })}
            className='flex-1' />
          <p className='text-sm'>Nombre del Taller</p>
        </label>
        <label className='flex-1 flex flex-col'>
          <InputField
            value={data.location}
            onChange={({ currentTarget }) => setData({ ...data, location: currentTarget.value })}
            className='flex-1' />
          <p className='text-sm'>Ubicación</p>
        </label>
        <label className='flex-1 flex flex-col'>
          <InputField
            value={data.representative}
            onChange={({ currentTarget }) => setData({ ...data, representative: currentTarget.value })}
            className='flex-1' />
          <p className='text-sm'>Nombre del Representante</p>
        </label>
        <label className='flex-1 flex flex-col'>
          <InputField
            value={data.phoneNumber}
            onChange={({ currentTarget }) => setData({ ...data, phoneNumber: currentTarget.value })}
            className='flex-1' />
          <p className='text-sm'>Telefono del Representante</p>
        </label>

        <button onClick={submit} className='p-2 font-bold uppercase bg-gray-700 rounded text-white mt-4'>Nuevo Taller</button>
        <Loader active={isLoading} />
      </div>
    </CustomModal>
  )
}