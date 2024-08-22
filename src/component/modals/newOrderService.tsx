import { CustomModal, ModalMinimalProps } from './layout'
import { FaUserGroup } from 'react-icons/fa6'
import { createPortal } from 'react-dom'
import { toast } from 'react-toastify'
import { InputHTMLAttributes, useState } from 'react'
import { OrderServicePropierties } from '@/interfaces'
import { axiosInstance } from '@/utils/http'
import { Endpoints } from '@/router'

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

const initialState: OrderServicePropierties = {
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
  }
}

export const NewOrderService = ({ setOpen, estimateId, onUpdate }: CustomProps) => {
  const [data, setData] = useState<OrderServicePropierties>(initialState)

  const submit = async () => {
    try {
      const response = await axiosInstance.post(Endpoints.CREATE_ORDER_SERVICE, {
        estimateId,
        ...data
      })
      if (response.status !== 200) {
        throw new Error(response.data)
      }
      setOpen(false)
      toast.info('Orden de Servicio Creada')
      onUpdate?.()
    } catch (error) {
      toast.error(String(error))
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
          <div className='flex flex-col gap-2'>
            <p className='text-xl text-gray-700'>Tipo de atención</p>

            <div className='flex items-center gap-2'>
              <ItemRadioButton
                label='Local'
                propsInput={{
                  checked: data.attentionType.isLocal,
                  onChange: () => setData(e => ({
                    ...e,
                    attentionType: {
                      ...initialState.attentionType,
                      isLocal: !e.attentionType.isLocal
                    }
                  }))
                }}
                name='attentionType' />
              <ItemRadioButton
                propsInput={{
                  checked: data.attentionType.isExpress,
                  onChange: () => setData(e => ({
                    ...e,
                    attentionType: {
                      ...initialState.attentionType,
                      isExpress: !e.attentionType.isExpress
                    }
                  }))
                }}
                label='Express'
                name='attentionType' />
              <ItemRadioButton
                propsInput={{
                  checked: data.attentionType.isHome,
                  onChange: () => setData(e => ({
                    ...e,
                    attentionType: {
                      ...initialState.attentionType,
                      isHome: !e.attentionType.isHome
                    }
                  }))
                }}
                label='A domicilio'
                name='attentionType' />
              <ItemRadioButton
                propsInput={{
                  checked: data.attentionType.isRescue,
                  onChange: () => setData(e => ({
                    ...e,
                    attentionType: {
                      ...initialState.attentionType,
                      isRescue: !e.attentionType.isRescue
                    }
                  }))
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
                  onChange: () => setData(e => ({
                    ...e,
                    preliminarManagment: {
                      ...e.preliminarManagment,
                      isDiagnosed: !e.preliminarManagment.isDiagnosed
                    }
                  }))
                }}
                label='Diganosticado' />

              <ItemCheck
                propsInput={{
                  checked: data.preliminarManagment.isProven,
                  onChange: () => setData(e => ({
                    ...e,
                    preliminarManagment: {
                      ...e.preliminarManagment,
                      isProven: !e.preliminarManagment.isProven
                    }
                  }))
                }}
                label='Comprobado' />

              <ItemCheck
                propsInput={{
                  checked: data.preliminarManagment.isKOEO,
                  onChange: () => setData(e => ({
                    ...e,
                    preliminarManagment: {
                      ...e.preliminarManagment,
                      isKOEO: !e.preliminarManagment.isKOEO
                    }
                  }))
                }}
                label='KOEO' />

              <ItemCheck
                propsInput={{
                  checked: data.preliminarManagment.isKOER,
                  onChange: () => setData(e => ({
                    ...e,
                    preliminarManagment: {
                      ...e.preliminarManagment,
                      isKOER: !e.preliminarManagment.isKOER
                    }
                  }))
                }}
                label='KOER' />

              <ItemCheck
                propsInput={{
                  checked: data.preliminarManagment.parked,
                  onChange: () => setData(e => ({
                    ...e,
                    preliminarManagment: {
                      ...e.preliminarManagment,
                      parked: !e.preliminarManagment.parked
                    }
                  }))
                }}
                label='Estacionado' />

              <ItemCheck
                propsInput={{
                  checked: data.preliminarManagment.onRoad,
                  onChange: () => setData(e => ({
                    ...e,
                    preliminarManagment: {
                      ...e.preliminarManagment,
                      onRoad: !e.preliminarManagment.onRoad
                    }
                  }))
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
                  onChange: () => setData(e => ({
                    ...e,
                    typesActivitiesToDo: {
                      ...e.typesActivitiesToDo,
                      isService: !e.typesActivitiesToDo.isService
                    }
                  }))
                }}
                label='Servicio' />

              <ItemCheck
                propsInput={{
                  checked: data.typesActivitiesToDo.isMaintenance,
                  onChange: () => setData(e => ({
                    ...e,
                    typesActivitiesToDo: {
                      ...e.typesActivitiesToDo,
                      isMaintenance: !e.typesActivitiesToDo.isMaintenance
                    }
                  }))
                }}
                label='Mantenimiento' />

              <ItemCheck
                propsInput={{
                  checked: data.typesActivitiesToDo.isMinorMantenance,
                  onChange: () => setData(e => ({
                    ...e,
                    typesActivitiesToDo: {
                      ...e.typesActivitiesToDo,
                      isMinorMantenance: !e.typesActivitiesToDo.isMinorMantenance
                    }
                  }))
                }}
                label='Menor' />

              <ItemCheck
                propsInput={{
                  checked: !data.typesActivitiesToDo.isMinorMantenance,
                  onChange: () => setData(e => ({
                    ...e,
                    typesActivitiesToDo: {
                      ...e.typesActivitiesToDo,
                      isMinorMantenance: !e.typesActivitiesToDo.isMinorMantenance
                    }
                  }))
                }}
                label='Mayor' />

              <ItemCheck
                propsInput={{
                  checked: data.typesActivitiesToDo.isPredictive,
                  onChange: () => setData(e => ({
                    ...e,
                    typesActivitiesToDo: {
                      ...e.typesActivitiesToDo,
                      isPredictive: !e.typesActivitiesToDo.isPredictive
                    }
                  }))
                }}
                label='Predictivo' />

              <ItemCheck
                propsInput={{
                  checked: data.typesActivitiesToDo.isPreventive,
                  onChange: () => setData(e => ({
                    ...e,
                    typesActivitiesToDo: {
                      ...e.typesActivitiesToDo,
                      isPreventive: !e.typesActivitiesToDo.isPreventive
                    }
                  }))
                }}
                label='Preventivo' />

              <ItemCheck
                propsInput={{
                  checked: data.typesActivitiesToDo.isCorrective,
                  onChange: () => setData(e => ({
                    ...e,
                    typesActivitiesToDo: {
                      ...e.typesActivitiesToDo,
                      isCorrective: !e.typesActivitiesToDo.isCorrective
                    }
                  }))
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
                  onChange: () => setData(e => ({
                    ...e,
                    serviceType: {
                      ...e.serviceType,
                      isMecanic: !e.serviceType.isMecanic
                    }
                  }))
                }}
                label='Mecánico' />

              <ItemCheck
                propsInput={{
                  checked: data.serviceType.isElectrict,
                  onChange: () => setData(e => ({
                    ...e,
                    serviceType: {
                      ...e.serviceType,
                      isElectrict: !e.serviceType.isElectrict
                    }
                  }))
                }}
                label='Eléctrico' />

              <ItemCheck
                propsInput={{
                  checked: data.serviceType.isElectroMecanic,
                  onChange: () => setData(e => ({
                    ...e,
                    serviceType: {
                      ...e.serviceType,
                      isElectroMecanic: !e.serviceType.isElectroMecanic
                    }
                  }))
                }}
                label='Electrómecanico' />

              <ItemCheck
                propsInput={{
                  checked: data.serviceType.isElectronic,
                  onChange: () => setData(e => ({
                    ...e,
                    serviceType: {
                      ...e.serviceType,
                      isElectronic: !e.serviceType.isElectronic
                    }
                  }))
                }}
                label='Electrónico' />

              <ItemCheck
                propsInput={{
                  checked: data.serviceType.isMultiple,
                  onChange: () => setData(e => ({
                    ...e,
                    serviceType: {
                      ...e.serviceType,
                      isMultiple: !e.serviceType.isMultiple
                    }
                  }))
                }}
                label='Multiple' />

              <ItemCheck
                propsInput={{
                  checked: data.serviceType.isExternal,
                  onChange: () => setData(e => ({
                    ...e,
                    serviceType: {
                      ...e.serviceType,
                      isExternal: !e.serviceType.isExternal
                    }
                  }))
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