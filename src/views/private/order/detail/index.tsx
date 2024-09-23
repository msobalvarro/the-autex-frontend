import dayjs from 'dayjs'
import _ from 'lodash'
import { LayoutComponent } from '@/component/ui/layout'
import { Loader } from '@/component/ui/loader'
import { TableComponent } from '@/component/table'
import { useAxios } from '@/hooks/fetch'
import { ActivityWithCostToDoItemEstimate, OrderServicePropierties } from '@/interfaces'
import { Endpoints, routes } from '@/router'
import { formatNumber } from '@/utils/formatNumber'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { TableRepresentation } from '@/component/estimate/tableRepresentation'
import { InputsGroupAddNewData } from '@/component/estimate/inputsGroupEstimate'
import { CheckboxField } from '@/component/order/checkboxField'
import { Comments } from '@/component/order/comments'
import { axiosInstance } from '@/utils/http'
import { toast } from 'react-toastify'
import { BillOrderPreview } from '@/component/modals/bill'
import { StatusOrder } from '@/component/order/statusOrder'

interface PropsQuery {
  id?: string
}

export const OrderDetailView = () => {
  const [showBill, toggleBill] = useState<boolean>(false)
  const [resume, setResume] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)
  const [findingsList, setFindingsList] = useState<string[]>([])
  const [observations, setObservations] = useState<string[]>([])
  const [additionalTaskList, setAdditionalTaskList] = useState<ActivityWithCostToDoItemEstimate[]>([])
  const queryParams: PropsQuery = useParams()
  const { data, loading, error, refetch } = useAxios({ endpoint: Endpoints.GET_ORDER_DETAIL_SERVICE + queryParams.id })
  const customData: OrderServicePropierties = data ? data : { status: 'pending' }

  useEffect(() => {
    if (customData?.findings?.length) {
      setFindingsList(customData?.findings)
    }

    if (customData?.observations?.length) {
      setObservations(customData?.observations)
    }

    if (customData?.resume) {
      setResume(customData.resume)
    }

  }, [customData])

  const removeResume = (resume: ActivityWithCostToDoItemEstimate) => {
    setAdditionalTaskList(resumes => _.remove(resumes, ({ uuid }: ActivityWithCostToDoItemEstimate) => uuid === resume.uuid))
  }

  const updateFindingsList = async () => {
    setLoading(true)

    try {
      if (findingsList.length === 0) {
        throw new Error('Ingresa al menos un hallazgo')
      }

      const response = await axiosInstance.put(Endpoints.UPDATE_FINDINGS_LIST, {
        id: customData._id,
        list: findingsList
      })

      if (response.status !== 200) {
        throw new Error(response.data);
      }

      toast.success('Lista de hallazgos actualizada')
      refetch()
    } catch (error: any) {
      toast.error(String(error.response.data || error))
    } finally {
      setLoading(false)
    }
  }

  const updateObservationsList = async () => {
    setLoading(true)

    try {
      if (observations.length === 0) {
        throw new Error('Ingresa al menos un hallazgo')
      }

      const response = await axiosInstance.put(Endpoints.UPDATE_OBSERVATIONS_LIST, {
        id: customData._id,
        list: observations
      })

      if (response.status !== 200) {
        throw new Error(response.data);
      }

      toast.success('Lista de observaciones actualizada')
      refetch()
    } catch (error: any) {
      toast.error(String(error.response.data || error))
    } finally {
      setLoading(false)
    }
  }

  const pushAdditionalTask = async () => {
    setLoading(true)

    try {
      if (additionalTaskList.length === 0) {
        throw new Error('Ingresa un registo')
      }

      const response = await axiosInstance.post(Endpoints.CREATE_ADDITIONAL_TASK_LIST, {
        id: customData._id,
        list: additionalTaskList
      })

      if (response.status !== 200) {
        throw new Error(response.data);
      }

      setAdditionalTaskList([])
      toast.success('Tareas adicionales actualizadas actualizada')
      refetch()
    } catch (error: any) {
      toast.error(String(error.response.data || error))
    } finally {
      setLoading(false)
    }
  }

  const updateResume = async () => {
    setLoading(true)

    try {
      if (resume.trim().length < 10) {
        throw new Error('Ingresa un registo')
      }

      const response = await axiosInstance.put(Endpoints.UPDATE_RESUME_ORDER_SERVICE, {
        id: customData._id,
        description: resume
      })

      if (response.status !== 200) {
        throw new Error(response.data);
      }

      toast.success('Resumen Actualizado')
      refetch()
    } catch (error: any) {
      toast.error(String(error.response.data || error))
    } finally {
      setLoading(false)
    }
  }

  const closeOrder = async () => {
    try {
      await axiosInstance.put(Endpoints.CLOSE_ORDER_SERVICE, {
        id: customData._id,
      })

      refetch()
      toast.info('Orden Finalizada')
    } catch (error: any) {
      toast.error(String(error.response.data || error))
    }
  }

  if (error) {
    return (
      <LayoutComponent renderBack>
        <div className='h-48 flex flex-col'>
          <p className='text-2lg text-gray-600'>Ha ocurrido un error</p>
          <p className='text-md text-gray-400'>{String(error)}</p>
        </div>
      </LayoutComponent>
    )
  }

  const isProceessOrPending = (customData.status === 'pending' || customData.status === 'process')

  return (
    <LayoutComponent renderBack>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <p className='text-2xl text-gray-600'>
            Orden de Servicio
          </p>
          <span className='text-ms text-gray-500'>Orden fecha de emisión {dayjs(String(customData.createdAt)).format('D, MMM YYYY h:mm A')}</span>
          <code className='text-gray-500'>{customData._id}</code>
        </div>

        <div className='flex flex-col items-end'>
          <div className='flex items-center gap-4'>
            <Link className='hover:underline text-sky-600' to={routes.ESTIMATE_DETAIL.replace(':id', String(customData.estimateProps?._id))}>
              Ir a Presupuesto
            </Link>

            {isProceessOrPending && (
              <button onClick={closeOrder} className='p-2 bg-gray-600 rounded text-white'>Cerrar Orden</button>
            )}

            {customData.status === 'finished' && (
              <a href='#' onClick={() => toggleBill(true)} className='hover:underline text-sky-600'>Ver Factura</a>
            )}

            <StatusOrder status={customData.status} />
          </div>
        </div>
      </div>

      {/* Client and vehicule */}
      <div className='flex justify-between text-lg uppercase'>
        <div className='flex items-center gap-1 text-gray-600'>
          <p className='font-bold'>Cliente: </p>
          <p>{customData.estimateProps?.client?.name}</p>
        </div>

        <div className='flex items-center gap-1 text-gray-600'>
          <p className='font-bold'>Vehículo:</p>
          <p>
            {`
              ${customData.estimateProps?.vehicule?.brand?.description} 
              ${customData.estimateProps?.vehicule?.model?.description}
            `}
          </p>

          <p className='text-gray-600'>[{customData.estimateProps?.vehicule?.plate}]</p>

          <p>({customData.traveled?.distance} {customData.traveled?.type})</p>
        </div>
      </div>

      <hr />

      {/* Activities required and seleccion option */}
      <div className='flex flex-1 gap-8 uppercase'>
        <div className='flex flex-1 flex-col gap-8'>
          <div className='flex flex-col gap-2'>
            <p className='text-lg text-gray-600 uppercase'>Actividades Requeridas</p>
            <TableComponent
              renderEnum
              data={
                customData.estimateProps?.activitiesToDo?.map(item => (
                  {
                    '__item': item,
                    'Actividades': item.description,
                    'Costo Unitario': formatNumber(Number(item.unitCost)),
                    'Total': formatNumber(Number(item.total)),
                  }
                )) ||
                []
              }
            />
          </div>

          <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
              <p className='text-lg text-gray-600 uppercase'>Tareas adicionales / Otros Servicios</p>
              {additionalTaskList.length > 0 && (
                <button onClick={pushAdditionalTask} className='hover:bg-gray-500 bg-gray-600 text-white px-3 py-1 rounded'>Actualizar</button>
              )}
            </div>

            {(customData.additionalTask) && (
              <TableRepresentation
                renderOptions={isProceessOrPending}
                onRemoveItems={removeResume}
                list={customData?.additionalTask || []} />
            )}

            {(additionalTaskList.length > 0) && (
              <TableRepresentation
                renderOptions={isProceessOrPending}
                onRemoveItems={removeResume}
                list={additionalTaskList} />
            )}

            {isProceessOrPending && (
              <InputsGroupAddNewData small onAdd={(e) => setAdditionalTaskList(resumes => [...resumes, e])} />
            )}
          </div>
        </div>

        <div className='flex flex-col gap-6'>
          <div className='flex'>
            <article className='flex flex-col gap-3 flex-1'>
              <p className='text-gray-500 text-xl'>Gestiones Preliminares</p>
              <div className='flex flex-col text-sm'>
                <CheckboxField label='Diagnóstico' checked={customData.preliminarManagment?.isDiagnosed} />
                <CheckboxField label='Comprobado' checked={customData.preliminarManagment?.isProven} />
                <CheckboxField label='KOEO' checked={customData.preliminarManagment?.isKOEO} />
                <CheckboxField label='KOER' checked={customData.preliminarManagment?.isKOER} />
                <CheckboxField label='Estacionado' checked={customData.preliminarManagment?.parked} />
                <CheckboxField label='En Movimiento' checked={customData.preliminarManagment?.onRoad} />
              </div>
            </article>

            <article className='flex flex-col gap-3 flex-1'>
              <p className='text-gray-500 text-xl'>Tipo de atención</p>
              <div className='flex flex-col gap4 text-sm'>
                <CheckboxField label='Local' checked={customData.attentionType?.isLocal} />
                <CheckboxField label='Express' checked={customData.attentionType?.isExpress} />
                <CheckboxField label='A Domicilio' checked={customData.attentionType?.isHome} />
                <CheckboxField label='Auxilio / Rescate' checked={customData.attentionType?.isRescue} />
              </div>
            </article>
          </div>

          <hr />

          <div className='flex'>
            <article className='flex flex-col gap-3 flex-1'>
              <p className='text-gray-500 text-xl'>Tipos de Actividades</p>
              <div className='flex flex-col text-sm'>
                <CheckboxField label='Servicio' checked={customData.typesActivitiesToDo?.isService} />
                <CheckboxField label='Matenimiento' checked={customData.typesActivitiesToDo?.isMaintenance} />
                <CheckboxField label='Menor' checked={customData.typesActivitiesToDo?.isMinorMantenance} />
                <CheckboxField label='Mayor' checked={!customData.typesActivitiesToDo?.isMinorMantenance} />
                <CheckboxField label='Predectivo' checked={customData.typesActivitiesToDo?.isPredictive} />
                <CheckboxField label='Preventivo' checked={customData.typesActivitiesToDo?.isPredictive} />
                <CheckboxField label='Correctivo' checked={customData.typesActivitiesToDo?.isCorrective} />
              </div>
            </article>

            <article className='flex flex-col gap-3 flex-1'>
              <p className='text-gray-500 text-xl'>Servicio</p>
              <div className='flex flex-col text-sm'>
                <CheckboxField label='Mecánico' checked={customData.serviceType?.isMecanic} />
                <CheckboxField label='Eléctrico' checked={customData.serviceType?.isElectrict} />
                <CheckboxField label='Electromecánico' checked={customData.serviceType?.isElectroMecanic} />
                <CheckboxField label='Electrónico' checked={customData.serviceType?.isElectronic} />
                <CheckboxField label='Multiple' checked={customData.serviceType?.isMultiple} />
                <CheckboxField label='Externo' checked={customData.serviceType?.isExternal} />
              </div>
            </article>
          </div>

        </div>
      </div>

      <hr />

      {/* other description and observations */}
      <div className='flex flex-1 gap-8'>
        <div className='flex flex-1 flex-col gap-6'>
          <div className='flex items-center justify-between'>
            <p className='text-gray-500 text-xl'>Hallazgos durante el proceso de ejecución</p>
            {customData.findings?.toString() !== findingsList.toString() && (
              <button onClick={updateFindingsList} className='hover:bg-gray-500 bg-gray-600 text-white px-3 py-1 rounded'>Actualizar</button>
            )}
          </div>

          {findingsList.length > 0 && (
            <TableComponent
              renderEnum
              data={
                findingsList.map(item => (
                  {
                    '__item': item,
                    'Hallazgo': item
                  }
                )) ||
                []
              }
            />
          )}

          {isProceessOrPending && (
            <Comments onAdd={(val) => setFindingsList(l => [...l, val])} label='Escriba los Hallazgos' />
          )}
        </div>

        <div className='flex flex-1 flex-col gap-6'>
          <div className='flex items-center justify-between'>
            <p className='text-gray-500 text-xl'>Observaciones / Recomendaciones</p>
            {customData.observations?.toString() !== observations.toString() && (
              <button onClick={updateObservationsList} className='hover:bg-gray-500 bg-gray-600 text-white px-3 py-1 rounded'>Actualizar</button>
            )}
          </div>

          {observations.length > 0 && (
            <TableComponent
              renderEnum
              data={
                observations.map(item => (
                  {
                    '__item': item,
                    'Observaciones': item
                  }
                )) ||
                []
              }
            />
          )}

          {isProceessOrPending && (
            <Comments onAdd={(val) => setObservations(l => [...l, val])} label='Escriba los Hallazgos' />
          )}
        </div>
      </div>

      {/* Description */}
      <div className={` flex flex-col gap-1 justify-between text-lg uppercase`}>
        <p className='text-gray-400 text-sm ml-2'>Breve descripcion de lo realizado</p>
        <div className='flex flex-col flex-1 gap-4 border p-4 rounded transition hover:shadow-md'>
          <textarea
            value={resume}
            maxLength={256}
            disabled={customData.status === 'finished'}
            rows={3}
            onChange={({ currentTarget }) => setResume(currentTarget.value)}
            className='focus:outline-none text-gray-600 bg-transparent border-none'
            placeholder='Ingrese una breve resumen de las tareas realizadas' />

          {(customData.resume !== resume && isProceessOrPending) && (
            <div className='flex justify-between items-center'>
              <p className='text-gray-400 text-sm'>
                Ingrese al menos 10 carácteres | {resume.length} de 256
              </p>

              {resume.trim().length > 3 && (
                <button
                  onClick={updateResume}
                  className='hover:bg-gray-500 self-end py-2 px-4 rounded bg-gray-600 text-white'>
                  Actualizar
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {showBill && <BillOrderPreview orderId={String(customData._id)} setOpen={toggleBill} />}

      <Loader active={loading || isLoading} />
    </LayoutComponent>
  )
}