import { useEffect, useState } from 'react'
import { ActivityWithCostToDoItemEstimate, Client, SelectionProps } from '@/interfaces'
import { CustomModal, ModalMinimalProps } from '@/component/modals/layout'
import { InputsGroupAddNewData } from '@/component/estimate/inputsGorupEstimate'
import { TableRepresentation } from '@/component/estimate/tableRepresentation'
import { CustomSelectOption } from '@/component/selection'
import { useAxios } from '@/hooks/fetch'
import { Endpoints } from '@/router'
import { RiCalculatorFill } from 'react-icons/ri'

interface ListRepresentationProps {
  onAdd: (e: ActivityWithCostToDoItemEstimate) => void
  list: ActivityWithCostToDoItemEstimate[]
  title: string
}

const ListRepresentation = ({ list, onAdd, title }: ListRepresentationProps) => (
  <div className='flex flex-col gap-1'>
    <p className='text-lg text-gray-400 uppercase'>{title}</p>
    <InputsGroupAddNewData onAdd={onAdd} />

    {list.length > 0 && <TableRepresentation list={list} />}
  </div>
)

const Icon = <RiCalculatorFill className='text-gray-600 text-xl' />

export const NewEstimation = ({ setOpen }: ModalMinimalProps) => {
  const [currentSteps, setSteps] = useState<number>(1)
  const [clientSelected, setClient] = useState<string | null>(null)
  const [carSelected, setCar] = useState<string | null>(null)
  const [clientList, setClientList] = useState<SelectionProps[]>([])
  const [carsList, setCarsList] = useState<SelectionProps[]>([])
  const [acitivities, setAcitivities] = useState<ActivityWithCostToDoItemEstimate[]>([])
  const [partsRequired, setPartRequires] = useState<ActivityWithCostToDoItemEstimate[]>([])
  const [otherRequirements, setOtherRequirements] = useState<ActivityWithCostToDoItemEstimate[]>([])
  const { data: dataClients, loading } = useAxios({ endpoint: Endpoints.GET_ALL_CLIENTS_WITH_CARS })

  const addActivity = (activity: ActivityWithCostToDoItemEstimate) => {
    setAcitivities([...acitivities, activity])
  }

  const addParts = (activity: ActivityWithCostToDoItemEstimate) => {
    setPartRequires([...acitivities, activity])
  }

  const addOtherRequirements = (activity: ActivityWithCostToDoItemEstimate) => {
    setOtherRequirements([...acitivities, activity])
  }

  useEffect(() => {
    if (dataClients && Array.isArray(dataClients)) {
      setClientList([...dataClients]?.map((item: Client) => ({
        'label': item.name,
        'value': item._id,
      })))
    }
  }, [dataClients])

  useEffect(() => {
    if (clientSelected && Array.isArray(dataClients)) {
      const indexFinded = [...dataClients].findIndex((c: Client) => c._id === clientSelected)

      if (indexFinded > -1) {
        setCarsList(dataClients[indexFinded]?.['vehicules'])
      }
    }
  }, [clientSelected])

  // validation for step 1
  const disabledValidationFirstStep = (
    currentSteps === 1 && (
      acitivities.length === 0
      // || carSelected === null
      || clientSelected === null
    )
  )

  const renderSubtitle = (): string => {
    switch (currentSteps) {
      case 1: return 'Selecciona el cliente y la unidad'
      case 2: return 'Ingresa las partes principales requiridas'
      case 3: return 'Ingresa otros requerimientos'
      default: return 'Resumen del Presupuesto'
    }
  }

  return (
    <CustomModal
      isOpen={true}
      setOpen={setOpen}
      title={`Nuevo Presupuesto (Paso ${currentSteps} de 4)`}
      subTitle={renderSubtitle()}
      containerClassesNames='flex flex-col gap-8'
      navButtonsOptions={{
        createText: 'Crear Presupuesto',
        isFinally: currentSteps === 4,
        onNextClick: () => setSteps(step => step + 1),
        onBackClick: () => setSteps(step => step - 1),
        nextDisabled: (disabledValidationFirstStep),
        renderBack: currentSteps > 1,
      }}
      iconComponent={Icon}>
      <>
        {currentSteps === 1 && (
          <>
            <div>
              <div className='flex flex-row flex-1 gap-2 justify-stretch'>
                <CustomSelectOption
                  onChange={(e) => setClient(String(e?.value))}
                  placeholder='Cliente'
                  className='flex-1'
                  isLoading={loading}
                  data={clientList} />

                <CustomSelectOption
                  isDisabled={!clientSelected}
                  placeholder='Vehículo'
                  onChange={(e) => setCar(String(e?.value))}
                  className='flex-1'
                  data={carsList} />
              </div>

              {clientSelected && carsList.length === 0 && (
                <p className='text-red-400 text-sm mt-1'>No se encontraron vehiculos a este cliente</p>
              )}
            </div>

            <ListRepresentation title='Actividades Previstas a Realizar' list={acitivities} onAdd={addActivity} />
          </>
        )}

        {currentSteps === 2 && (
          <ListRepresentation title='Partes Principaes Requeridas' list={partsRequired} onAdd={addParts} />
        )}

        {currentSteps === 3 && (
          <ListRepresentation title='Resultado de Comprobaciones Realizadas' list={otherRequirements} onAdd={addOtherRequirements} />
        )}
      </>
    </CustomModal>
  )
}
