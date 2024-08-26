import _ from 'lodash'
import { useEffect, useState } from 'react'
import { ActivityWithCostToDoItemEstimate, Client, SelectionProps, Vehicule } from '@/interfaces'
import { CustomModal, ModalMinimalProps } from '@/component/modals/layout'
import { InputsGroupAddNewData } from '@/component/estimate/inputsGorupEstimate'
import { TableRepresentation } from '@/component/estimate/tableRepresentation'
import { CustomSelectOption } from '@/component/selection'
import { useAxios } from '@/hooks/fetch'
import { Endpoints } from '@/router'
import { RiCalculatorFill } from 'react-icons/ri'
import { IoCheckmarkSharp } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { axiosInstance } from '@/utils/http'
import { formatNumber } from '@/utils/formatNumber'


interface ListRepresentationProps {
  onAdd: (e: ActivityWithCostToDoItemEstimate) => void
  onRemove: (e: ActivityWithCostToDoItemEstimate) => void
  list: ActivityWithCostToDoItemEstimate[]
  title: string
}

const ListRepresentation = ({ list, onAdd, title, onRemove }: ListRepresentationProps) => (
  <div className='flex flex-col gap-4'>
    <p className='text-lg text-gray-600 uppercase'>{title}</p>
    {list.length > 0 && (
      <TableRepresentation onRemoveItems={onRemove} list={list} />
    )}
    <InputsGroupAddNewData onAdd={onAdd} />
  </div>
)

const Icon = <RiCalculatorFill className='text-gray-600 text-xl' />

export const NewEstimation = ({ setOpen, onUpdate }: ModalMinimalProps) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [currentSteps, setSteps] = useState<number>(1)
  const [clientSelected, setClient] = useState<string | null>(null)
  const [vehiculeSelected, setVehicule] = useState<string | null>(null)
  const [clientList, setClientList] = useState<SelectionProps[]>([])
  const [carsList, setCarsList] = useState<SelectionProps[]>([])
  const [acitivities, setAcitivities] = useState<ActivityWithCostToDoItemEstimate[]>([])
  const [partsRequired, setPartRequires] = useState<ActivityWithCostToDoItemEstimate[]>([])
  const [otherRequirements, setOtherRequirements] = useState<ActivityWithCostToDoItemEstimate[]>([])
  const [externalActivities, setExternalActivities] = useState<ActivityWithCostToDoItemEstimate[]>([])
  const { data: dataClients, loading } = useAxios({ endpoint: Endpoints.GET_ALL_CLIENTS_WITH_CARS })

  const addActivity = (activity: ActivityWithCostToDoItemEstimate) => {
    setAcitivities([...acitivities, activity])
  }

  const addExternalActivity = (activity: ActivityWithCostToDoItemEstimate) => {
    setExternalActivities([...externalActivities, activity])
  }

  const removeActivity = (activity: ActivityWithCostToDoItemEstimate) => {
    setAcitivities(_.remove(acitivities, ({ uuid }: ActivityWithCostToDoItemEstimate) => uuid === activity.uuid))
  }

  const removeExternalActivity = (activity: ActivityWithCostToDoItemEstimate) => {
    setExternalActivities(_.remove(acitivities, ({ uuid }: ActivityWithCostToDoItemEstimate) => uuid === activity.uuid))
  }

  const addParts = (activity: ActivityWithCostToDoItemEstimate) => {
    setPartRequires([...partsRequired, activity])
  }

  const removeParts = (activity: ActivityWithCostToDoItemEstimate) => {
    setPartRequires(_.remove(partsRequired,
      ({ uuid }: ActivityWithCostToDoItemEstimate) => uuid === activity.uuid
    ))
  }

  const addOtherRequirements = (activity: ActivityWithCostToDoItemEstimate) => {
    setOtherRequirements([...otherRequirements, activity])
  }

  const removeRequirements = (activity: ActivityWithCostToDoItemEstimate) => {
    setOtherRequirements(_.remove(otherRequirements,
      ({ uuid }: ActivityWithCostToDoItemEstimate) => uuid === activity.uuid
    ))
  }

  const onCreateEstimation = async () => {
    setLoading(true)

    try {
      const data = {
        'clientId': clientSelected,
        'vehiculeId': vehiculeSelected,
        'laborCost': sums.ACTIVITY,
        'partsCost': sums.PARTS,
        'inputCost': sums.OTHER,
        'total': _.sum(Object.values(sums)),
        'activitiesToDo': acitivities,
        'requiredParts': partsRequired,
        'otherRequirements': otherRequirements,
        'externalActivities': externalActivities,
      }

      const response = await axiosInstance.post(Endpoints.CREATE_ESTIMATION, data)

      if (response.status !== 200) {
        throw new Error(`Ha ocurido un error ${String(response.data)}`)
      }

      toast.success('Presupuesto creado')
      setOpen(false)
      onUpdate?.()
    } catch (error) {
      toast.error(String(error))
    } finally {
      setLoading(false)
    }
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
        const vehicules: SelectionProps[] = []
        if (Array.isArray((dataClients[indexFinded]?.['vehicules']))) {
          [...(dataClients[indexFinded]?.['vehicules'])].map((vehicule: Vehicule) => {
            vehicules.push({
              label: `${vehicule.brand?.description} ${vehicule.model?.description} [${vehicule.plate}]`,
              value: String(vehicule._id)
            })
          })
        }
        setCarsList(vehicules)
      }
    }
  }, [clientSelected])

  // validation for step 1
  const disabledValidationFirstStep = (
    currentSteps === 1 && (
      acitivities.length === 0
      || vehiculeSelected === null
      || clientSelected === null
    ) ||
    currentSteps === 2 && (
      partsRequired.length === 0
      || otherRequirements.length === 0
    )
  )

  const renderSubtitle = (): string => {
    switch (currentSteps) {
      case 1: return 'Selecciona el cliente, vehículo e ingresa todas las actividades'
      case 2: return 'Ingresa las partes principales requiridas'
      case 3: return 'Ingresa otros requerimientos'
      default: return 'Resumen del Presupuesto'
    }
  }

  const sums = {
    ACTIVITY: _.sumBy(partsRequired, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)),
    PARTS: _.sumBy(partsRequired, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)),
    EXTERNAL: _.sumBy(externalActivities, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)),
    OTHER: _.sumBy(otherRequirements, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)),
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
        isFinally: currentSteps === 3,
        renderNext: true,
        onSuccess: onCreateEstimation,
        onNextClick: () => setSteps(step => step + 1),
        onBackClick: () => setSteps(step => step - 1),
        nextDisabled: (disabledValidationFirstStep || isLoading),
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
                  onChange={(e) => setVehicule(String(e?.value))}
                  className='flex-1'
                  data={carsList} />
              </div>

              {clientSelected && carsList.length === 0 && (
                <p className='text-red-400 text-sm mt-1'>No se encontraron vehiculos a este cliente</p>
              )}
            </div>

            <ListRepresentation
              title='Actividades Previstas a Realizar'
              list={acitivities}
              onRemove={removeActivity}
              onAdd={addActivity} />

            <hr />

            <ListRepresentation
              title='Actividades Externas'
              list={externalActivities}
              onRemove={removeExternalActivity}
              onAdd={addExternalActivity} />
          </>
        )}

        {currentSteps === 2 && (
          <>
            <ListRepresentation
              title='Partes Principales Requeridas'
              list={partsRequired}
              onRemove={removeParts}
              onAdd={addParts} />

            <hr />

            <ListRepresentation
              title='Otros Requerimientos'
              list={otherRequirements}
              onRemove={removeRequirements}
              onAdd={addOtherRequirements} />
          </>
        )}

        {currentSteps === 3 && (
          <>
            <div className='flex flex-col gap-4 px-10'>
              <p className='text-lg text-gray-600 uppercase'>Resumen Total</p>

              <div className='flex'>
                <div className='flex flex-col gap-4'>
                  <div className='flex gap-2'>
                    <IoCheckmarkSharp />
                    <p>
                      Precio total Por Mano de obra <b>[{formatNumber(sums.ACTIVITY)}]</b>
                    </p>
                  </div>

                  <div className='flex gap-2'>
                    <IoCheckmarkSharp />
                    <p>
                      Precio total Por Mano de obra Externa <b>[{formatNumber(sums.EXTERNAL)}]</b>
                    </p>
                  </div>

                  <div className='flex gap-2'>
                    <IoCheckmarkSharp />
                    <p>
                      Precio por repuestos <b>[{formatNumber(sums.ACTIVITY)}]</b>
                    </p>
                  </div>

                  <div className='flex gap-2'>
                    <IoCheckmarkSharp />
                    <p>
                      Insumos <b>[{formatNumber(sums.OTHER)}]</b>
                    </p>
                  </div>
                </div>

                <div className='text-center flex-1'>
                  <p className='text-4xl text-gray-800 font-bold'>
                    {formatNumber(_.sum(Object.values(sums)))}
                  </p>
                  <p className='text-xl font-bold text-gray-400'>Precio total</p>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </CustomModal>
  )
}
