import { toast } from 'react-toastify'
import { createPortal } from 'react-dom'
import { useState } from 'react'
import { CustomModal, ModalMinimalProps } from '@/component/modals/layout'
import { FaUserGroup } from 'react-icons/fa6'
import { Client, NewClientProps } from '@/interfaces'
import { axiosInstance } from '@/utils/http'
import { Endpoints } from '@/router'
import { InputField } from '@/component/ui/input'
import { CustomSelectOption } from '@/component/ui/selection'
import { useValidation } from '@/hooks/validations'
import { AxiosError } from 'axios'
import { Loader } from '../ui/loader'

const valuesTypes = {
  PERSON: 'person',
  COMPANY: 'company',
}

interface Props extends ModalMinimalProps {
  defaultValue?: Client
}

export const UpdateAndNewClient = ({ setOpen, onUpdate, defaultValue }: Props) => {
  const { validateNumber } = useValidation()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<NewClientProps>({
    documentId: defaultValue?.documentId || '',
    email: defaultValue?.email || '',
    name: defaultValue?.name || '',
    phoneNumber: defaultValue?.phoneNumber || '',
    type: defaultValue?.type || 'person',
  })

  const onSubmit = async () => {
    setLoading(true)
    try {
      if (defaultValue) {
        await axiosInstance.put(Endpoints.UPDATE_CLIENT, {
          _id: defaultValue._id,
          ...data,
        })
        toast.success(`cliente actualizado`)
      } else {
        await axiosInstance.post(Endpoints.CREATE_CLIENT, data)
        toast.success('cliente creado')
      }

      setOpen(false)
      onUpdate?.()
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data)
      } else {
        toast.error(String(error))
      }
    } finally {
      setLoading(false)
    }
  }

  return createPortal(
    (
      <CustomModal
        isOpen
        small
        setOpen={setOpen}
        title={defaultValue ? 'Actualizar Cliente' : `Agrega un nuevo cliente`}
        subTitle={defaultValue ? 'Actualiza el cliente y sus datos' : 'Agrega un nuevo cliente para generar ordenes o asignarle un vehículo'}
        containerClassesNames='flex flex-col gap-8'
        navButtonsOptions={{
          onBackClick: () => setOpen(false),
          onSuccess: onSubmit,
          isFinally: true,
          renderBack: false,
          backText: 'Cerrar'
        }}
        iconComponent={<FaUserGroup size={24} />}>
        <div className='flex flex-col gap-4'>
          <label className='flex flex-col flex-1'>
            <InputField
              value={String(data.name)}
              onChange={
                ({ currentTarget }) => setData(
                  v => ({
                    ...v,
                    name: String(currentTarget.value)
                  })
                )} />
            <span className='ml-2 text-gray-500 font-[300]'>Nombre y Apellido</span>
          </label>

          <label className='flex flex-col flex-1'>
            <InputField
              value={String(data.phoneNumber)}
              onChange={
                ({ currentTarget }) =>
                  validateNumber(currentTarget.value) && setData(
                    v => ({
                      ...v,
                      phoneNumber: String(currentTarget.value)
                    })
                  )} />
            <span className='ml-2 text-gray-500 font-[300]'>Número de teléfono</span>
          </label>

          <label className='flex flex-col flex-1'>
            <InputField
              value={String(data.email)}
              onChange={
                ({ currentTarget }) => setData(
                  v => ({
                    ...v,
                    email: String(currentTarget.value)
                  })
                )} />
            <span className='ml-2 text-gray-500 font-[300]'>Correo electrónico</span>
          </label>

          <label className='flex flex-col flex-1'>
            <CustomSelectOption
              onChange={(e) => setData(x => ({ ...x, type: String(e?.value) }))}
              placeholder='Cliente'
              value={{
                value: data.type,
                label: data.type === valuesTypes.PERSON ? 'Persona' : 'Empresa'
              }}
              className='flex-1'
              data={[
                {
                  label: 'Persona',
                  value: valuesTypes.PERSON
                },
                {
                  label: 'Empresa',
                  value: valuesTypes.COMPANY
                },
              ]} />
            <span className='ml-2 text-gray-500 font-[300]'>Tipo de Cliente</span>
          </label>

          <label className='flex flex-col flex-1 '>
            <InputField
              value={String(data.documentId)}
              onChange={
                ({ currentTarget }) => setData(
                  v => ({
                    ...v,
                    documentId: String(currentTarget.value)
                  })
                )} />
            <span className='ml-2 text-gray-500 font-[300]'>
              {data.type === valuesTypes.PERSON ? 'Identificación' : 'RUC'}
            </span>
          </label>

          <Loader active={isLoading} />
        </div>
      </CustomModal>
    ),
    document.body
  )
}