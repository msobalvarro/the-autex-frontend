import { CustomModal, ModalMinimalProps } from '@/component/modals/layout'
import { CustomSelectOption } from '@/component/selection'
import { useAxios } from '@/hooks/fetch'
import { Client, SelectionProps } from '@/interfaces'
import { Endpoints } from '@/router'
import { useEffect, useState } from 'react'
import { RiCalculatorFill } from 'react-icons/ri'

const Icon = <RiCalculatorFill className='text-gray-600 text-xl' />

export const NewEstimation = ({ setOpen }: ModalMinimalProps) => {
  const [clientSelect, setClient] = useState<string | null>(null)
  const [carSelected, setCar] = useState<string | null>(null)
  const [clientList, setClientList] = useState<SelectionProps[]>([])
  const [carsList, setCarsList] = useState<SelectionProps[]>([])
  const { data: dataClients, loading } = useAxios({ endpoint: Endpoints.GET_ALL_CLIENTS_WITH_CARS })

  useEffect(() => {
    if (dataClients && Array.isArray(dataClients)) {
      setClientList([...dataClients]?.map((item: Client) => ({
        'label': item.name,
        'value': item._id,
      })))
    }
  }, [dataClients])

  useEffect(() => {
    if (clientSelect && Array.isArray(dataClients)) {
      const indexFinded = [...dataClients].findIndex((c: Client) => c._id === clientSelect)

      if (indexFinded > -1) {
        setCarsList(dataClients[indexFinded]?.['vehicules'])
      }
    }
  }, [clientSelect])

  return (
    <CustomModal
      isOpen={true}
      setOpen={setOpen}
      title='Nuevo Presupuesto'
      subTitle='Crea nuevo presupuesto para un cliente'
      containerClassesNames ='flex flex-col gap-10'
      iconComponent={Icon}>
      <div>
        <div className='flex flex-row flex-1 gap-2 justify-stretch'>
          <CustomSelectOption
            onChange={(e) => setClient(String(e?.value))}
            placeholder='Cliente'
            className='flex-1'
            isLoading={loading}
            data={clientList} />

          <CustomSelectOption
            isDisabled={!clientSelect}
            placeholder='Vehículo'
            onChange={(e) => setCar(String(e?.value))}
            className='flex-1'
            data={carsList} />
        </div>

        {clientSelect && carsList.length === 0 && (
          <p className='text-red-400 text-sm mt-1'>No se encontraron vehiculos a este cliente</p>
        )}
      </div>
    </CustomModal>
  )
}
