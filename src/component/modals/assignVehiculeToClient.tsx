import { CustomModal, ModalMinimalProps } from '@/component/modals/layout'
import { useAxios } from '@/hooks/fetch'
import { Client, Vehicule } from '@/interfaces'
import { Endpoints } from '@/router'
import { IoCarSportSharp } from 'react-icons/io5'
import { Loader } from '../loading'
import { toast } from 'react-toastify'
import { axiosInstance } from '@/utils/http'
import { useState } from 'react'

interface Props extends ModalMinimalProps {
  client: Client
}

export const AssignVehiculeToClient = ({ setOpen, client }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const { data: allVehicules, loading } = useAxios({ endpoint: Endpoints.GET_ALL_VEHICULE })

  const assignVehicule = async (vehiculeId: string) => {
    setLoading(true)

    try {
      const response = await axiosInstance.post(Endpoints.ASSIGN_VEHICULE_TO_CLIENT, {
        vehiculeId,
        clientId: client._id
      })

      if (response.status === 500) {
        throw new Error('Lo siento, algo ha salido mal')
      }

      toast.info(`Vehiculo asignado a ${client.name}`)
      setOpen(false)
    } catch (error) {
      toast.error(String(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <CustomModal
      isOpen={true}
      setOpen={setOpen}
      title={`Asigna un vehiculo`}
      subTitle='Selecciona un vehiculo para asiganar al cliente'
      containerClassesNames='flex flex-col gap-8'
      navButtonsOptions={{
        isFinally: false,
        onBackClick: () => setOpen(false),
        renderBack: true,
        renderNext: false,
        backText: 'Cerrar'
      }}
      iconComponent={<IoCarSportSharp />}>
      <div>
        {Array.isArray(allVehicules) && [...allVehicules].map((vehicule: Vehicule) => (
          <div className='flex space-between justify-between p-2 hover:bg-gray-200 transition rounded' key={crypto.randomUUID()}>
            <p className='text-xl text-gray-700'>
              {vehicule.brand?.description} {vehicule.model?.description} [{vehicule.plate}]
            </p>

            <button onClick={() => assignVehicule(String(vehicule._id))} className='rounded p-2 bg-gray-100'>Seleccionar</button>
          </div>
        ))}

        <Loader active={loading || isLoading} />
      </div>
    </CustomModal>
  )
}
