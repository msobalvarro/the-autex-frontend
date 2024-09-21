import { toast } from 'react-toastify'
import { createPortal } from 'react-dom'
import { CustomModal, ModalMinimalProps } from './layout'
import { IoSettings } from 'react-icons/io5'
import { UiCheckbox } from '../ui/checkbox'
import { axiosInstance } from '@/utils/http'
import { useEffect, useState } from 'react'
import { useAxios } from '@/hooks/fetch'
import { Endpoints } from '@/router'
import { WorkshopConfigurationsPropierties } from '@/interfaces'
import { Loader } from '../ui/loader'

interface Props extends ModalMinimalProps {
  workshopId: string
}

export const WorkshopSettingsModal = ({ setOpen, workshopId }: Props) => {
  const { data, error, loading } = useAxios({ endpoint: Endpoints.GET_WORKSHOP_CONFIG_BY_ID.replace(':id', workshopId) })

  const [configuration, setConfiguration] = useState<WorkshopConfigurationsPropierties>({
    fee: true,
  })

  useEffect(() => {
    if (data) {
      setConfiguration(data)
    }
  }, [data])

  const updateConfiguration = async () => {
    try {
      // await axiosInstance.post()


    } catch (error) {
      toast.error(String(error))
    }
  }

  console.log(configuration !== data)

  return (
    createPortal(
      (
        <CustomModal
          isOpen
          small
          setOpen={setOpen}
          title='Configuraciones'
          subTitle='Administra las configuraciones de tu taller'
          containerClassesNames='flex flex-col gap-4 relative'
          navButtonsOptions={{
            createText: 'Guardar',
            isFinally: true,
            renderBack: false,
            nextDisabled: configuration !== data
          }}
          iconComponent={<IoSettings size={24} />}>
          <>
            {error && <p className='text-xl text-rose-400'>{error}</p>}

            {data && (<>
              <label className='flex items-center gap-2 text-gray-600 text-lg'>
                <UiCheckbox
                  checked={configuration.fee}
                  onChange={() => setConfiguration({
                    ...configuration,
                    fee: !configuration.fee,
                  })} />

                <p>Taller de Cuota Fija</p>
              </label>
            </>)}

            <Loader active={loading} />
          </>
        </CustomModal>
      ),
      document.body
    )
  )
}