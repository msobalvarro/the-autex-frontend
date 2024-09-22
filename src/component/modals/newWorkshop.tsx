import { InputField } from '@/component/ui/input'
import { CustomModal, ModalMinimalProps } from './layout'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { Loader } from '../ui/loader'
import { axiosInstance } from '@/utils/http'
import { Endpoints } from '@/router'
import { WorkshopStateProps } from '@/interfaces'
import { UiCheckbox } from '../ui/checkbox'

export const NewWorkshopModal = ({ setOpen, onUpdate }: ModalMinimalProps) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<WorkshopStateProps>({
    location: '',
    name: '',
    phoneNumber: '',
    representative: '',
    slogan: '',
    ruc: '',
    fixedFee: true,
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

      await axiosInstance.post(Endpoints.CREATE_WORKSHOP, data)

      setOpen(false)
      onUpdate?.()

      toast.info('Taller creado')
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
      navButtonsOptions={{
        isFinally: true,
        renderBack: false,
        createText: 'Crear Taller',
        onSuccess: submit,
        nextDisabled: isLoading
      }}
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
        <label className='flex-1 flex flex-col'>
          <InputField
            value={data.ruc}
            onChange={({ currentTarget }) => setData({ ...data, ruc: currentTarget.value })}
            className='flex-1' />
          <p className='text-sm'>Nùmero RUC</p>
        </label>
        <label className='flex-1 flex flex-col'>
          <InputField
            value={data.slogan}
            onChange={({ currentTarget }) => setData({ ...data, slogan: currentTarget.value })}
            className='flex-1' />
          <p className='text-sm'>Slogan</p>
        </label>

        <label className='flex-1 flex items-center gap-4'>
          <UiCheckbox
            checked={data.fixedFee}
            onChange={() => setData({ ...data, fixedFee: !data })} />
          <p className='text-sm'>Cuota fíja</p>
        </label>
        <Loader active={isLoading} />
      </div>
    </CustomModal>
  )
}