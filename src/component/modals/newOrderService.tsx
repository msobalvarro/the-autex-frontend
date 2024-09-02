import { CustomModal, ModalMinimalProps } from './layout'
import { FaUserGroup } from 'react-icons/fa6'
import { createPortal } from 'react-dom'
import { toast } from 'react-toastify'
import { InputHTMLAttributes, useState } from 'react'
import { DistanceTraveledPropierties, OrderStateProps } from '@/interfaces'
import { axiosInstance } from '@/utils/http'
import { Endpoints } from '@/router'
import { InputField } from '../ui/input'
import { useValidation } from '@/hooks/validations'
import { CustomSelectOption } from '../ui/selection'

interface ItemCheckPros {
  label: string
  propsInput?: InputHTMLAttributes<HTMLInputElement>
}

interface ItemRadioButtonsProps {
  label: string
  name: string
  propsInput?: InputHTMLAttributes<HTMLInputElement>
}

const ItemRadioButton = ({ label, name, propsInput }: ItemRadioButtonsProps) => {
  return (
    <label className='flex items-center pl-2 border-l-2 gap-1 border-gray-200'>
      <input type='radio' name={name} {...propsInput} />
      <span className='text-gray-600'>{label}</span>
    </label>
  )
}

const ItemCheck = ({ label, propsInput }: ItemCheckPros) => {
  return (
    <label className='flex items-center pl-2 border-l-2 gap-1 border-gray-200'>
      <input type='checkbox' {...propsInput} />
      <span className='text-gray-600'>{label}</span>
    </label>
  )
}

interface CustomProps extends ModalMinimalProps {
  estimateId?: string | null
}

const initialState: OrderStateProps = {
  attentionType: {
    isExpress: false,
    isHome: false,
    isLocal: false,
    isRescue: false
  },
  preliminarManagment: {
    isDiagnosed: false,
    isKOEO: false,
    isKOER: false,
    isProven: false,
    onRoad: false,
    parked: false,
  },
  typesActivitiesToDo: {
    isCorrective: false,
    isMaintenance: true,
    isMinorMantenance: false,
    isPredictive: false,
    isPreventive: false,
    isService: false,
  },
  serviceType: {
    isElectrict: false,
    isElectroMecanic: false,
    isElectronic: false,
    isExternal: false,
    isMecanic: false,
    isMultiple: false,
  },
}

export const NewOrderService = ({ setOpen, estimateId, onUpdate }: CustomProps) => {
  const { validateNumber } = useValidation()
  const [traveled, setTraveled] = useState<DistanceTraveledPropierties>({ distance: 0, type: 'km' })
  const [data, setData] = useState<OrderStateProps>(initialState)

  const submit = async () => {
    try {
      const response = await axiosInstance.post(Endpoints.CREATE_ORDER_SERVICE, {
        estimateId,
        ...data,
        traveled,
      })
      if (response.status !== 200) {
        throw new Error(response.data)
      }
      setOpen(false)
      toast.info('Orden de Servicio Creada')
      onUpdate?.()
    } catch (error: any) {
      toast.error(String(error.response.data || error))
    }
  }

  return createPortal(
    (
      <CustomModal
        isOpen={true}
        setOpen={setOpen}
        title='Genera una nueva orden'
        subTitle='Genera una orden apartir de un presupuesto ya creado'
        containerClassesNames='flex flex-col gap-8'
        navButtonsOptions={{
          onBackClick: () => setOpen(false),
          onSuccess: submit,
          isFinally: true,
          renderBack: false,
          backText: 'Cerrar'
        }}
        iconComponent={<FaUserGroup />}>
        <>
          <div className='flex flex-row flex-1 gap-2 justify-stretch'>
            <label className='flex flex-col'>
              <span>KM/MILL Actuales.</span>
              <InputField
                value={traveled.distance}
                onChange={
                  ({ currentTarget }) =>
                    validateNumber(currentTarget.value) &&
                    setTraveled(trav => ({ ...trav, distance: Number(currentTarget.value) }))
                }
                placeholder='Ingrese los Km / Millas actuales'
                className='flex-1' />
            </label>

            <label>
              <span>Seleccione Kilometos / Millas</span>
              <CustomSelectOption
                placeholder='Kilometro y Millas'
                onChange={(data) => setTraveled(e => ({ ...e, type: String(data?.value) }))}
                className='flex-1'
                data={[
                  { label: 'Kilómetros', value: 'km' },
                  { label: 'Millas', value: 'miles' },
                ]} />
            </label>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-xl text-gray-700'>Tipo de atención</p>

            <div className='flex items-center gap-2'>
              <ItemRadioButton
                label='Local'
                propsInput={{
                  checked: data.attentionType?.isLocal,
                  onChange: () => setData({
                    ...data,
                    attentionType: {
                      ...initialState.attentionType,
                      isLocal: !data?.attentionType?.isLocal
                    }
                  })
                }}
                name='attentionType' />
              <ItemRadioButton
                propsInput={{
                  checked: data?.attentionType?.isExpress,
                  onChange: () => setData({
                    ...data,
                    attentionType: {
                      ...initialState.attentionType,
                      isExpress: !data?.attentionType?.isExpress
                }
                })
                }}
              label='Express'
                name='attentionType' />
              <ItemRadioButton
                propsInput={{
                  checked: data?.attentionType?.isHome,
                  onChange: () => setData({
                    ...data,
                    attentionType: {
                      ...initialState.attentionType,
                      isHome: !data?.attentionType.isHome
                    }
                  })
                }}
                label='A domicilio'
                name='attentionType' />
              <ItemRadioButton
                propsInput={{
                  checked: data?.attentionType?.isRescue,
                  onChange: () => setData({
                    ...data,
                    attentionType: {
                      ...initialState.attentionType,
                      isRescue: !data?.attentionType?.isRescue
                    }
                  })
                }}
                label='Rescate'
                name='attentionType' />
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-xl text-gray-700'>Gestion Preliminares</p>

            <div className='flex items-center gap-2'>
              <ItemCheck
                propsInput={{
                  checked: data.preliminarManagment.isDiagnosed,
                  onChange: () => setData({
                    ...data,
                    preliminarManagment: {
                      ...data.preliminarManagment,
                      isDiagnosed: !data.preliminarManagment.isDiagnosed
                    }
                  })
                }}
                label='Diganosticado' />

              <ItemCheck
                propsInput={{
                  checked: data.preliminarManagment.isProven,
                  onChange: () => setData({
                    ...data,
                    preliminarManagment: {
                      ...data.preliminarManagment,
                      isProven: !data.preliminarManagment.isProven
                    }
                  })
                }}
                label='Comprobado' />

              <ItemCheck
                propsInput={{
                  checked: data.preliminarManagment.isKOEO,
                  onChange: () => setData({
                    ...data,
                    preliminarManagment: {
                      ...data.preliminarManagment,
                      isKOEO: !data.preliminarManagment.isKOEO
                    }
                  })
                }}
                label='KOEO' />

              <ItemCheck
                propsInput={{
                  checked: data.preliminarManagment.isKOER,
                  onChange: () => setData({
                    ...data,
                    preliminarManagment: {
                      ...data.preliminarManagment,
                      isKOER: !data.preliminarManagment.isKOER
                    }
                  })
                }}
                label='KOER' />

              <ItemCheck
                propsInput={{
                  checked: data.preliminarManagment.parked,
                  onChange: () => setData({
                    ...data,
                    preliminarManagment: {
                      ...data.preliminarManagment,
                      parked: !data.preliminarManagment.parked
                    }
                  })
                }}
                label='Estacionado' />

              <ItemCheck
                propsInput={{
                  checked: data.preliminarManagment.onRoad,
                  onChange: () => setData({
                    ...data,
                    preliminarManagment: {
                      ...data.preliminarManagment,
                      onRoad: !data.preliminarManagment.onRoad
                    }
                  })
                }}
                label='En movimiento' />

            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-xl text-gray-700'>Tipos de Actividades</p>

            <div className='flex items-center gap-2'>
              <ItemCheck
                propsInput={{
                  checked: data.typesActivitiesToDo.isService,
                  onChange: () => setData({
                    ...data,
                    typesActivitiesToDo: {
                      ...data.typesActivitiesToDo,
                      isService: !data.typesActivitiesToDo.isService
                    }
                  })
                }}
                label='Servicio' />

              <ItemCheck
                propsInput={{
                  checked: data.typesActivitiesToDo.isMaintenance,
                  onChange: () => setData({
                    ...data,
                    typesActivitiesToDo: {
                      ...data.typesActivitiesToDo,
                      isMaintenance: !data.typesActivitiesToDo.isMaintenance
                    }
                  })
                }}
                label='Mantenimiento' />

              <ItemCheck
                propsInput={{
                  checked: data.typesActivitiesToDo.isMinorMantenance,
                  onChange: () => setData({
                    ...data,
                    typesActivitiesToDo: {
                      ...data.typesActivitiesToDo,
                      isMinorMantenance: !data.typesActivitiesToDo.isMinorMantenance
                    }
                  })
                }}
                label='Menor' />

              <ItemCheck
                propsInput={{
                  checked: !data.typesActivitiesToDo.isMinorMantenance,
                  onChange: () => setData({
                    ...data,
                    typesActivitiesToDo: {
                      ...data.typesActivitiesToDo,
                      isMinorMantenance: !data.typesActivitiesToDo.isMinorMantenance
                    }
                  })
                }}
                label='Mayor' />

              <ItemCheck
                propsInput={{
                  checked: data.typesActivitiesToDo.isPredictive,
                  onChange: () => setData({
                    ...data,
                    typesActivitiesToDo: {
                      ...data.typesActivitiesToDo,
                      isPredictive: !data.typesActivitiesToDo.isPredictive
                    }
                  })
                }}
                label='Predictivo' />

              <ItemCheck
                propsInput={{
                  checked: data.typesActivitiesToDo.isPreventive,
                  onChange: () => setData({
                    ...data,
                    typesActivitiesToDo: {
                      ...data.typesActivitiesToDo,
                      isPreventive: !data.typesActivitiesToDo.isPreventive
                    }
                  })
                }}
                label='Preventivo' />

              <ItemCheck
                propsInput={{
                  checked: data.typesActivitiesToDo.isCorrective,
                  onChange: () => setData({
                    ...data,
                    typesActivitiesToDo: {
                      ...data.typesActivitiesToDo,
                      isCorrective: !data.typesActivitiesToDo.isCorrective
                    }
                  })
                }}
                label='Correctivo' />
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-xl text-gray-700'>Servicio</p>

            <div className='flex items-center gap-2'>
              <ItemCheck
                propsInput={{
                  checked: data.serviceType.isMecanic,
                  onChange: () => setData({
                    ...data,
                    serviceType: {
                      ...data.serviceType,
                      isMecanic: !data.serviceType.isMecanic
                    }
                  })
                }}
                label='Mecánico' />

              <ItemCheck
                propsInput={{
                  checked: data.serviceType.isElectrict,
                  onChange: () => setData({
                    ...data,
                    serviceType: {
                      ...data.serviceType,
                      isElectrict: !data.serviceType.isElectrict
                    }
                  })
                }}
                label='Eléctrico' />

              <ItemCheck
                propsInput={{
                  checked: data.serviceType.isElectroMecanic,
                  onChange: () => setData({
                    ...data,
                    serviceType: {
                      ...data.serviceType,
                      isElectroMecanic: !data.serviceType.isElectroMecanic
                    }
                  })
                }}
                label='Electrómecanico' />

              <ItemCheck
                propsInput={{
                  checked: data.serviceType.isElectronic,
                  onChange: () => setData({
                    ...data,
                    serviceType: {
                      ...data.serviceType,
                      isElectronic: !data.serviceType.isElectronic
                    }
                  })
                }}
                label='Electrónico' />

              <ItemCheck
                propsInput={{
                  checked: data.serviceType.isMultiple,
                  onChange: () => setData({
                    ...data,
                    serviceType: {
                      ...data.serviceType,
                      isMultiple: !data.serviceType.isMultiple
                    }
                  })
                }}
                label='Multiple' />

              <ItemCheck
                propsInput={{
                  checked: data.serviceType.isExternal,
                  onChange: () => setData({
                    ...data,
                    serviceType: {
                      ...data.serviceType,
                      isExternal: !data.serviceType.isExternal
                    }
                  })
                }}
                label='Externo' />

            </div>
          </div>
        </>
      </CustomModal>
    ),
    document.body
  )
}