import { createPortal } from 'react-dom'
import { CustomModal, ModalMinimalProps } from './layout'
import { FaCar } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { axiosInstance } from '@/utils/http'
import { Endpoints } from '@/router'
import { InputField } from '../input'
import { useState } from 'react'
import { NewVehiculeProps } from '@/interfaces'

export const NewVehicule = ({ setOpen }: ModalMinimalProps) => {
  const [data, setData] = useState<NewVehiculeProps>({
    brandId: null,
    modelId: null,
    color: '',
    type: 'auto',
    motorNumber: '',
    chasisNumber: '',
    km: 0,
    plate: '',
    year: 0,
  })
  
  const onSubmit = async () => {
    try {
      const respone = await axiosInstance.post(Endpoints.CREATE_VEHICULE)

      if (respone.status !== 200) {
        throw new Error(String(respone.data))
      }

    } catch (error) {
      toast.error(String(error))
    }
  }

  return createPortal(
    (
      <CustomModal
        isOpen
        setOpen={setOpen}
        title='Agrega un nuevo Vehículo'
        subTitle='Agrega un nuevo vehiculo para asignarlo a un cliente y generar ordenes'
        containerClassesNames='flex flex-col gap-8'
        navButtonsOptions={{
          onBackClick: () => setOpen(false),
          onSuccess: onSubmit,
          isFinally: true,
          renderBack: false,
          backText: 'Cerrar'
        }}
        iconComponent={<FaCar />}>
        <>
          <div className='flex gap-4'>
            <label className='flex flex-col flex-1'>
              <InputField
                value={String(data.motorNumber)}
                onChange={
                  ({ currentTarget }) => setData(
                    v => ({
                      ...v,
                      name: String(currentTarget.value)
                    })
                  )} />
              <span className='ml-2 text-gray-500 font-[300]'>Número de motor</span>
            </label>

            <label className='flex flex-col flex-1'>
              <InputField
                value={String(data.chasisNumber)}
                onChange={
                  ({ currentTarget }) => setData(
                    v => ({
                      ...v,
                      lastName: String(currentTarget.value)
                    })
                  )} />
              <span className='ml-2 text-gray-500 font-[300]'>Número de chasís</span>
            </label>
          </div>
        </>
      </CustomModal>
    ),
    document.body
  )
}