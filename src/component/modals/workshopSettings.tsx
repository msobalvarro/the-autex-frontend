import { toast } from 'react-toastify'
import { createPortal } from 'react-dom'
import { CustomModal, ModalMinimalProps } from './layout'
import { IoSettings } from 'react-icons/io5'
import { UiCheckbox } from '../ui/checkbox'
import { axiosInstance } from '@/utils/http'
import { useState } from 'react'

interface Props extends ModalMinimalProps {
  workshopId: String
}

export const WorkshopSettingsModal = ({ setOpen }: Props) => {
  const [configuration, setConfiguration] = useState<boolean>(false)
  
  const updateConfiguration = async () => {
    try {
      // await axiosInstance.post()


    } catch (error) {
      toast.error(String(error))
    }
  }

  return (
    createPortal(
      (
        <CustomModal
          isOpen
          small
          setOpen={setOpen}
          title='Configuraciones'
          subTitle='Administra las configuraciones de tu taller'
          containerClassesNames='flex flex-col gap-4'
          navButtonsOptions={{
            createText: 'Guardar',
            isFinally: true,
            renderBack: false,
          }}
          iconComponent={<IoSettings size={24} />}>
          <label className='flex items-center gap-2 text-gray-600 text-lg'>
            <UiCheckbox disabled checked onChange={() => { }} />

            <p>Taller de Cuota Fija</p>
          </label>
        </CustomModal>
      ),
      document.body
    )
  )
}