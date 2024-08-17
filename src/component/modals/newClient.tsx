import { useState } from 'react'
import { CustomModal, ModalMinimalProps } from './layout'
import { FaUserGroup } from 'react-icons/fa6'
import { NewClientProps } from '@/interfaces'
import { axiosInstance } from '@/utils/http'
import { Endpoints } from '@/router'
import { toast } from 'react-toastify'
import { createPortal } from 'react-dom'
import { InputField } from '../input'
import { CustomSelectOption } from '../selection'
import { useValidation } from '@/hooks/validations'

const valuesTypes = {
  PERSON: 'person',
  COMPANY: 'company',
}

export const NewClient = ({ setOpen, onUpdate }: ModalMinimalProps) => {
  const { validateNumber } = useValidation()
  const [data, setData] = useState<NewClientProps>({
    documentId: '',
    email: '',
    name: '',
    lastName: '',
    phoneNumber: '',
    type: 'person',
  })

  const onSubmit = async () => {
    try {
      const response = await axiosInstance.post(Endpoints.CREATE_CLIENT, {
        ...data,
        name: `${data.name} ${data.lastName}`,
      })

      if (response.status !== 200) {
        throw new Error(`No se ha podido crear cliente: ${response.data}`)
      }
      toast.success(`Se agregó a ${data.name} como nuevo cliente`)

      setOpen(false)
      onUpdate?.()
    } catch (error) {
      toast.error(String(error))
    }
  }

  return createPortal(
    (
      <CustomModal
        isOpen={true}
        setOpen={setOpen}
        title={`Agrega un nuevo cliente`}
        subTitle='Agrega un nuevo cliente para generar ordenes o asignarle un vehículo'
        containerClassesNames='flex flex-col gap-8'
        navButtonsOptions={{
          onBackClick: () => setOpen(false),
          onSuccess: onSubmit,
          isFinally: true,
          renderBack: false,
          backText: 'Cerrar'
        }}
        iconComponent={<FaUserGroup />}>
        <>
          <div className='flex gap-4'>
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
              <span className='ml-2 text-gray-500 font-[300]'>Nombre</span>
            </label>

            <label className='flex flex-col flex-1'>
              <InputField
                value={String(data.lastName)}
                onChange={
                  ({ currentTarget }) => setData(
                    v => ({
                      ...v,
                      lastName: String(currentTarget.value)
                    })
                  )} />
              <span className='ml-2 text-gray-500 font-[300]'>Apellido</span>
            </label>
          </div>

          <div className='flex gap-4'>
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
          </div>

          <div className='flex gap-4'>
            <label className='flex flex-col flex-1'>
              <CustomSelectOption
                onChange={(e) => setData(x => ({ ...x, type: String(e?.value) }))}
                placeholder='Cliente'
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
                {data.type === valuesTypes.PERSON ? 'Número de Identidad' : 'Número Root'}
              </span>
            </label>
          </div>
        </>
      </CustomModal>
    ),
    document.body
  )
}