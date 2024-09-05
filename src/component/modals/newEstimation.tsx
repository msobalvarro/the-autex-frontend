import _ from 'lodash'
import { useEffect, useState } from 'react'
import { ActivitiesGroupPropierties, ActivityWithCostToDoItemEstimate, Client, DistanceTraveledPropierties, SelectionProps, Vehicule } from '@/interfaces'
import { CustomModal, ModalMinimalProps } from '@/component/modals/layout'
import { InputsGroupAddNewData } from '@/component/estimate/inputsGroupEstimate'
import { TableRepresentation } from '@/component/estimate/tableRepresentation'
import { CustomSelectOption } from '@/component/ui/selection'
import { useAxios } from '@/hooks/fetch'
import { Endpoints, routes } from '@/router'
import { RiCalculatorFill } from 'react-icons/ri'
import { IoCheckmarkSharp } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { axiosInstance } from '@/utils/http'
import { formatNumber } from '@/utils/formatNumber'
import { InputField } from '../ui/input'
import { useValidation } from '@/hooks/validations'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../ui/loader'


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
    <InputsGroupAddNewData small onAdd={onAdd} />
  </div>
)

const Icon = <RiCalculatorFill className='text-gray-600 text-xl' />

export const NewEstimation = ({ setOpen }: ModalMinimalProps) => {
  const navigate = useNavigate()
  const { validateNumber } = useValidation()
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
  const [traveled, setTraveled] = useState<DistanceTraveledPropierties>({ distance: 0, type: null })
  const [activitiesGroupId, setAcitivtyGroupId] = useState<string | null>(null)
  const [activitiesGroupCost, setAcitivitiesGroupCost] = useState<number>(0)
  const { data: dataActivities, loading: loadingActivities } = useAxios({ endpoint: Endpoints.GET_ACTIVITIES_GROUP })
  const { data: dataClients, loading } = useAxios({ endpoint: Endpoints.GET_ALL_CLIENTS_WITH_CARS })
  const activitiesGroupData: ActivitiesGroupPropierties[] | null = Array.isArray(dataActivities) ? [...dataActivities] : null

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
        'externalCost': sums.EXTERNAL,
        'total': total,
        'traveled': traveled,
        'activitiesToDo': acitivities,
        'requiredParts': partsRequired,
        'otherRequirements': otherRequirements,
        'externalActivities': externalActivities,
        'activitiesGroupId': activitiesGroupId,
        'activitiesGroupCost': activitiesGroupCost
      }

      const response = await axiosInstance.post(Endpoints.CREATE_ESTIMATION, data)

      if (response.status !== 200) {
        throw new Error(`Ha ocurido un error ${String(response.data)}`)
      }

      toast.success('Presupuesto creado')
      setOpen(false)
      // onUpdate?.()
      navigate(routes.ESTIMATE_DETAIL.replace(':id', response.data?.['_id']))
    } catch (error: any) {
      toast.error(String(error.response.data || error))
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
      vehiculeSelected === null
      || clientSelected === null
      || traveled.distance === 0
      || traveled.type === null
    ) ||
    currentSteps === 3 && (
      acitivities.length === 0
    ) ||
    currentSteps === 3 && (
      partsRequired.length === 0
      || otherRequirements.length === 0
    )
  )

  const renderSubtitle = (): string => {
    switch (currentSteps) {
      case 1: return 'Selecciona el cliente, vehículo'
      case 2: return 'Igresa las actividades a realizar'
      case 3: return 'Ingresa las partes principales requiridas'
      case 4: return 'Confirme el valor total'
      default: return 'Resumen del Presupuesto'
    }
  }

  const sums = {
    ACTIVITY: _.sumBy(acitivities, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)),
    PARTS: _.sumBy(partsRequired, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)),
    EXTERNAL: _.sumBy(externalActivities, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)),
    OTHER: _.sumBy(otherRequirements, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)),
  }

  const distanceType: SelectionProps[] = [
    { label: 'Kilómetros', value: 'km' },
    { label: 'Millas', value: 'miles' },
  ]

  const total = _.sum(Object.values(sums)) + activitiesGroupCost

  return (
    <CustomModal
      medium
      isOpen={true}
      setOpen={setOpen}
      title={`Nuevo Presupuesto (Paso ${currentSteps} de 4)`}
      subTitle={renderSubtitle()}
      containerClassesNames='flex flex-col gap-8'
      navButtonsOptions={{
        createText: 'Crear Presupuesto',
        isFinally: currentSteps === 4,
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
                <label className='flex-1 flex flex-col'>
                  <CustomSelectOption
                    onChange={(e) => setClient(String(e?.value))}
                    value={clientList.filter(option => option.value === clientSelected)}
                    placeholder='Cliente'
                    className='flex-1'
                    isLoading={loading}
                    data={clientList} />
                  <span className='text-gray-600 ml-2'>Seleccione el Cliente *</span>
                </label>

                <label className='flex-1 flex flex-col'>
                  <CustomSelectOption
                    isDisabled={!clientSelected}
                    value={carsList.filter(option => option.value === vehiculeSelected)}
                    placeholder='Unidad'
                    onChange={(e) => setVehicule(String(e?.value))}
                    className='flex-1'
                    data={carsList} />
                  <span className='text-gray-600 ml-2'>Seleccione la Unidad *</span>
                </label>
              </div>
              {clientSelected && carsList.length === 0 && (
                <p className='text-red-400 text-sm mt-1 ml-2'>No se encontraron vehiculos a este cliente</p>
              )}
            </div>

            <div className='flex flex-row flex-1 gap-2 justify-stretch'>
              <label className='flex-1 flex flex-col'>
                <InputField
                  value={traveled.distance}
                  onChange={
                    ({ currentTarget }) =>
                      validateNumber(currentTarget.value) &&
                      setTraveled(trav => ({ ...trav, distance: Number(currentTarget.value) }))
                  }
                  className='flex-1' />
                <span className='text-gray-600 ml-2'>Ingrese los Km / Millas actuales *</span>
              </label>

              <label className='flex-1 flex flex-col'>
                <CustomSelectOption
                  placeholder='Kilometro y Millas'
                  value={distanceType.filter(option => option.value === traveled.type)}
                  onChange={(data) => setTraveled(e => ({ ...e, type: String(data?.value) }))}
                  className='flex-1'
                  data={distanceType} />

                <span className='text-gray-600 ml-2'>Seleccione Km ó Millas *</span>
              </label>
            </div>

            {(activitiesGroupData !== null) && (
              <div className='flex flex-row flex-1 gap-2 justify-stretch'>
                <label className='flex flex-col flex-1'>
                  <CustomSelectOption
                    value={activitiesGroupData.map(act => ({
                      label: act.name,
                      value: act._id
                    })).filter(option => option.value === activitiesGroupId)}
                    placeholder='Grupo de Mantenimientos'
                    onChange={(data) => setAcitivtyGroupId(String(data?.value))}
                    className='flex-1'
                    data={activitiesGroupData.map(act => ({
                      label: act.name,
                      value: act._id
                    }))} />

                  <span className='text-gray-600 ml-2'>Seleccione un grupo de Mantenimiento</span>
                </label>

                <label className='flex flex-col flex-1'>
                  <InputField
                    value={String(activitiesGroupCost)}
                    onChange={(({ currentTarget }) =>
                      validateNumber(currentTarget.value) &&
                      setAcitivitiesGroupCost(Number(currentTarget.value))
                    )}
                    placeholder='Ingrese el precio' />

                  <span className='text-gray-600 ml-2'>Ingrese el Precio de la actividad</span>
                </label>
              </div>
            )}
          </>
        )}

        {currentSteps === 2 && (
          <>
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

        {currentSteps === 3 && (
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

        {currentSteps === 4 && (
          <>
            <div className='flex flex-col gap-4'>
              <p className='text-lg text-gray-600 uppercase'>Resumen Total</p>

              <div className='flex'>
                <div className='flex flex-col gap-4'>
                  <div className='flex gap-2 items-center'>
                    <IoCheckmarkSharp />
                    <p>
                      Mano de obra <b>{formatNumber(sums.ACTIVITY)}</b>
                    </p>
                  </div>

                  <div className='flex gap-2 items-center'>
                    <IoCheckmarkSharp />
                    <p>
                      Mano de obra Externa <b>{formatNumber(sums.EXTERNAL)}</b>
                    </p>
                  </div>

                  <div className='flex gap-2 items-center'>
                    <IoCheckmarkSharp />
                    <p>
                      Repuestos <b>{formatNumber(sums.PARTS)}</b>
                    </p>
                  </div>

                  <div className='flex gap-2 items-center'>
                    <IoCheckmarkSharp />
                    <p>
                      Insumos <b>{formatNumber(sums.OTHER)}</b>
                    </p>
                  </div>

                  {activitiesGroupId && (
                    <div className='flex gap-2 items-center'>
                      <IoCheckmarkSharp />
                      <p>
                        Mantenimiento: <b>
                          {_.find(activitiesGroupData,
                            (e: ActivitiesGroupPropierties) => e._id == activitiesGroupId
                          )?.name} {formatNumber(activitiesGroupCost)}
                        </b>
                      </p>
                    </div>
                  )}
                </div>

                <div className='text-right flex-1'>
                  <p className='text-4xl text-gray-800 font-bold'>
                    {formatNumber(total)}
                  </p>
                  <p className='text-xl font-bold text-gray-400'>Precio total</p>
                </div>
              </div>
            </div>
          </>
        )}

        <Loader active={loading || loadingActivities || isLoading} />
      </>
    </CustomModal>
  )
}
