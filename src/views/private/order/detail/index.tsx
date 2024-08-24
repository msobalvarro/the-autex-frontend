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
import { IoCheckboxSharp } from 'react-icons/io5'
import { MdOutlineIndeterminateCheckBox } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { TableRepresentation } from '@/component/estimate/tableRepresentation'
import { InputsGroupAddNewData } from '@/component/estimate/inputsGorupEstimate'

interface CheckBoxProps {
  label: string
  checked?: boolean
}

const CheckboxField = ({ label, checked }: CheckBoxProps) => {
  return (
    <div className='flex items-center gap-2'>
      {checked && <IoCheckboxSharp />}
      {!checked && <MdOutlineIndeterminateCheckBox />}
      <span>{label}</span>
    </div>
  )
}

interface PropsQuery {
  id?: string
}

export const OrderDetailView = () => {
  const [listResume, setResume] = useState<ActivityWithCostToDoItemEstimate[]>([])
  const queryParams: PropsQuery = useParams()
  const { data, loading, error } = useAxios({
    endpoint: Endpoints.GET_ORDER_DETAIL_SERVICE + queryParams.id
  })
  const customData: OrderServicePropierties = data ? data : {}

  const removeResume = (resume: ActivityWithCostToDoItemEstimate) => {
    setResume(resumes => _.remove(resumes, ({ uuid }: ActivityWithCostToDoItemEstimate) => uuid === resume.uuid))
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
        <div>
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

      <div className='flex flex-1 gap-4 uppercase'>
        <div className='flex flex-1 flex-col gap-6'>
          <div className='flex flex-col'>
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

      <Loader active={loading} />
    </LayoutComponent>
  )
}