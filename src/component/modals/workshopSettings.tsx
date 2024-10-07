import { toast } from 'react-toastify'
import { createPortal } from 'react-dom'
import { CustomModal, ModalMinimalProps } from './layout'
import { IoSettings } from 'react-icons/io5'
import { UiCheckbox } from '../ui/checkbox'
import { axiosInstance } from '@/utils/http'
import { useEffect, useState } from 'react'
import { useAxios } from '@/hooks/fetch'
import { Endpoints } from '@/router'
import { WorkshopConfigurationsPropierties, WorkshopPropierties } from '@/interfaces'
import { Loader } from '../ui/loader'
import { AxiosError } from 'axios'

interface Props extends ModalMinimalProps {
  workshop: WorkshopPropierties
}

export const WorkshopSettingsModal = ({ setOpen, workshop }: Props) => {
  const { data, error, loading } = useAxios({ endpoint: Endpoints.GET_WORKSHOP_CONFIG_BY_ID.replace(':id', workshop._id) })

  const [configuration, setConfiguration] = useState<WorkshopConfigurationsPropierties>({
    fee: false,
  })

  useEffect(() => {
    if (data) {
      setConfiguration(data)
    }
  }, [data])

  const updateConfiguration = async () => {
    try {
      await axiosInstance.post(Endpoints.WORKSHOP_UPDATE_CONFIGURATION, {
        configuration,
        workshopId: workshop._id
      })

      toast.info('Configuraciones actualizadas')

      setOpen(false)
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(String(error.response?.data))
      } else {
        toast.error(String(error))
      }
    }
  }

  return (
    createPortal(
      (
        <CustomModal
          isOpen
          small
          setOpen={setOpen}
          title={`Configuraciones`}
          subTitle={workshop.name}
          containerClassesNames='flex flex-col gap-4 relative'
          navButtonsOptions={{
            createText: 'Guardar',
            isFinally: true,
            renderBack: false,
            // nextDisabled: configuration !== data,
            onSuccess: updateConfiguration
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

                <div className='flex flex-col'>
                  <p className='font-bold'>Cobro IVA</p>
                  <p className='text-gray-600 text-sm'>Agrega cobro de impuesto en factura</p>
                </div>
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