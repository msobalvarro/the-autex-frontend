import dayjs from 'dayjs'
import _ from 'lodash'
import { LayoutComponent } from '@/component/layout'
import { Loader } from '@/component/loader'
import { TableComponent } from '@/component/table'
import { useAxios } from '@/hooks/fetch'
import { ActivityWithCostToDoItemEstimate, OrderServicePropierties } from '@/interfaces'
import { Endpoints, routes } from '@/router'
import { formatNumber } from '@/utils/formatNumber'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { TableRepresentation } from '@/component/estimate/tableRepresentation'
import { InputsGroupAddNewData } from '@/component/estimate/inputsGorupEstimate'
import { CheckboxField } from '@/component/order/checkboxField'
import { Comments } from '@/component/order/comments'
import { axiosInstance } from '@/utils/http'
import { toast } from 'react-toastify'

interface PropsQuery {
  id?: string
}

export const OrderDetailView = () => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [findingsList, setFindingsList] = useState<string[]>([])
  const [observations, setObservations] = useState<string[]>([])
  const [listResume, setResume] = useState<ActivityWithCostToDoItemEstimate[]>([])
  const queryParams: PropsQuery = useParams()
  const { data, loading, error, refetch } = useAxios({
    endpoint: Endpoints.GET_ORDER_DETAIL_SERVICE + queryParams.id
  })
  const customData: OrderServicePropierties = data ? data : {}

  useEffect(() => {
    if (customData?.findings?.length) {
      setFindingsList(customData?.findings)
    }

    if (customData?.observations?.length) {
      setObservations(customData?.observations)
    }
  }, [customData])

  const removeResume = (resume: ActivityWithCostToDoItemEstimate) => {
    setResume(resumes => _.remove(resumes, ({ uuid }: ActivityWithCostToDoItemEstimate) => uuid === resume.uuid))
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
    } catch (error) {
      toast.error(String(error))
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
    } catch (error) {
      toast.error(String(error))
    } finally { 
      setLoading(false)
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

  return (
    <LayoutComponent renderBack>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <p className='text-xl text-gray-600 uppercase'>
            Fecha Orden: <b>{dayjs(String(customData.createdAt)).format('D, MMM YYYY h:mm A')}</b>
          </p>
          <code className='text-gray-500'>{customData._id}</code>
        </div>

        <div className='flex items-center gap-4'>
          <Link className='hover:underline text-blue-500' to={routes.ESTIMATE_DETAIL.replace(':id', String(customData.estimateProps?._id))}>
            Ir a Presupuesto
          </Link>
          <p className='text-gray-500 text-xl uppercase'>{customData.status}</p>
        </div>
      </div>

      <div className='flex justify-between text-lg uppercase'>
        <div className='flex items-center gap-1 text-gray-600'>
          <p className='font-bold'>Cliente: </p>
          <p>{customData.estimateProps?.client?.name}</p>
        </div>

        <div className='flex items-center gap-1 text-gray-600'>
          <p className='font-bold'>Vehciulo:</p>
          <p>
            {`
                ${customData.estimateProps?.vehicule?.brand?.description} 
                ${customData.estimateProps?.vehicule?.model?.description}
                `}
          </p>

          <p className='text-gray-600'>[{customData.estimateProps?.vehicule?.plate}]</p>
        </div>
      </div>

      <hr />

      <div className='flex flex-1 gap-8 uppercase'>
        <div className='flex flex-1 flex-col gap-6'>
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

        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-2'>
            <p className='text-lg text-gray-600 uppercase'>Actividades realizada</p>
            <TableComponent
              renderEnum
              data={
                customData.estimateProps?.activitiesToDo?.map(item => (
                  {
                    '__item': item,
                    'Actividades': item.description,
                    'Total': formatNumber(Number(item.total)),
                  }
                )) ||
                []
              }
            />
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-lg text-gray-600 uppercase'>Resumen del Resume realizado</p>
            {listResume.length > 0 && (
              <TableRepresentation onRemoveItems={removeResume} list={listResume} />
            )}

            {listResume.length === 0 && <p className='text-2xl text-gray-400 text-center my-4'>Agrega resumen de lo realizado</p>}
            <InputsGroupAddNewData small onAdd={(e) => setResume(resumes => [...resumes, e])} />
          </div>
        </div>
      </div>

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

          <Comments onAdd={(val) => setFindingsList(l => [...l, val])} label='Escriba los Hallazgos' />
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
                    'Hallazgo': item
                  }
                )) ||
                []
              }
            />
          )}

          <Comments onAdd={(val) => setObservations(l => [...l, val])} label='Escriba los Hallazgos' />
        </div>
      </div>

      <Loader active={loading || isLoading} />
    </LayoutComponent>
  )
}