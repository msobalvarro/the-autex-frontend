import _ from 'lodash'
import { createPortal } from 'react-dom'
import { CustomModal, ModalMinimalProps } from './layout'
import { FaCar } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { axiosInstance } from '@/utils/http'
import { Endpoints } from '@/router'
import { InputField } from '../input'
import { useEffect, useState } from 'react'
import { Client, NewVehiculeProps, SelectionProps, VehiculeBrands } from '@/interfaces'
import { useValidation } from '@/hooks/validations'
import { CustomSelectOption } from '../selection'
import { useAxios } from '@/hooks/fetch'
import { Loader } from '../loading'

export const typeRegister = {
  VEHICULE: 'auto',
  PICKUP: 'pickup',
  BAN: 'ban',
  TRUCK: 'truck',
  MOTORCYCLE: 'motorcycle',
}

export const NewVehicule = ({ setOpen, onUpdate }: ModalMinimalProps) => {
  const [modelList, setModelList] = useState<SelectionProps[]>([])
  const { validateNumber } = useValidation()
  const { data: dataBrands, loading: loadingBrand } = useAxios({ endpoint: Endpoints.GET_ALL_BRAND_MODEL })
  const { data: dataClient, loading: loadingClient } = useAxios({ endpoint: Endpoints.GET_ALL_CLIENTS })
  const [data, setData] = useState<NewVehiculeProps>({
    clientId: null,
    brandId: null,
    modelId: null,
    color: '',
    motorNumber: '',
    chasisNumber: '',
    km: 0,
    typeSelections: typeRegister.VEHICULE,
    plate: '',
    year: new Date().getFullYear(),
  })

  useEffect(() => {
    setData(e => ({ ...e, modelId: null }))

    if (Array.isArray(dataBrands)) {
      const arr: VehiculeBrands[] = [...dataBrands]
      const indexFinded = arr.findIndex((i: VehiculeBrands) => i._id === data.brandId)

      if (indexFinded > -1) {
        setModelList(arr[indexFinded].models.map(
          model => ({
            label: model.description,
            value: String(model._id),
          })
        ))
      }
    }
  }, [data.brandId])

  const onSubmit = async () => {
    try {
      const respone = await axiosInstance.post(Endpoints.CREATE_VEHICULE, {
        ...data,
        type: data.typeSelections
      })

      if (respone.status !== 200) {
        throw new Error(String(respone.data))
      }

      toast.success(`Vehículo agregado`)

      setOpen(false)
      onUpdate?.()
    } catch (error) {
      toast.error(String(error))
    }
  }

  return createPortal(
    (
      <CustomModal
        isOpen
        setOpen={setOpen}
        title='Agrega un nuevo Vehículo'
        subTitle='Agrega un nuevo vehiculo para asignarlo a un cliente y generar ordenes'
        containerClassesNames='flex flex-col gap-4'
        navButtonsOptions={{
          onBackClick: () => setOpen(false),
          onSuccess: onSubmit,
          isFinally: true,
          renderBack: false,
          backText: 'Cerrar'
        }}
        iconComponent={<FaCar />}>
        <>
          <div className='flex gap-4'>
            <label className='flex flex-col w-1/2'>
              <CustomSelectOption
                onChange={(e) => setData(x => ({ ...x, typeSelections: String(e?.value) }))}
                placeholder='Cliente'
                className='flex-1'
                data={[
                  {
                    label: 'Vehiculo',
                    value: typeRegister.VEHICULE
                  },
                  {
                    label: 'Motocicleta',
                    value: typeRegister.MOTORCYCLE
                  },
                  {
                    label: 'Pickup',
                    value: typeRegister.PICKUP
                  },
                  {
                    label: 'Ban',
                    value: typeRegister.BAN
                  },
                  {
                    label: 'Camión',
                    value: typeRegister.TRUCK
                  },
                ]} />
              <span className='ml-2 text-gray-500'>Tipo de Unidad</span>
            </label>

            <label className='flex flex-col w-1/2'>
              {Array.isArray(dataClient) && (
                <CustomSelectOption
                  onChange={(e) => setData(x => ({ ...x, clientId: String(e?.value) }))}
                  placeholder='Seleccione un Cliente'
                  isLoading={loadingBrand}
                  className='flex-1'
                  data={[...dataClient].map((client: Client) => ({
                    label: client.name,
                    value: client._id
                  }))} />
              )}

              <span className='ml-2 text-gray-500'>Selecciona un Cliente</span>
            </label>
          </div>

          <div className='flex gap-4'>
            <label className='flex flex-col w-1/2'>
              {Array.isArray(dataBrands) && (
                <CustomSelectOption
                  onChange={(e) => setData(x => ({ ...x, brandId: String(e?.value) }))}
                  placeholder='Seleccione una Marca'
                  isLoading={loadingBrand}
                  className='flex-1'
                  data={[...dataBrands].map((vehicule: VehiculeBrands) => ({
                    label: vehicule.description,
                    value: vehicule._id
                  }))} />
              )}

              <div className='flex ml-2 gap-2 items-center'>
                <span className='text-gray-500'>Marcas</span>
                {data.brandId && modelList.length == 0 && (
                  <span className='text-red-500 text-sm'>(A `gregue un modelo)</span>
                )}
              </div>
            </label>

            <label className='flex flex-col w-1/2'>
              <CustomSelectOption
                onChange={(e) => setData(x => ({ ...x, modelId: String(e?.value) }))}
                placeholder='Seleccione un Modelo'
                className='flex-1'
                isLoading={loadingBrand}
                data={modelList} />
              <span className='ml-2 text-gray-500'>Modelo</span>
            </label>
          </div>

          <div className='flex gap-4'>
            <label className='flex flex-col flex-1'>
              <InputField
                value={String(data.motorNumber)}
                onChange={
                  ({ currentTarget }) => setData(
                    v => ({
                      ...v,
                      motorNumber: String(currentTarget.value)
                    })
                  )} />
              <span className='ml-2 text-gray-500'>Número de motor</span>
            </label>

            <label className='flex flex-col flex-1'>
              <InputField
                value={String(data.chasisNumber)}
                onChange={
                  ({ currentTarget }) => setData(
                    v => ({
                      ...v,
                      chasisNumber: String(currentTarget.value)
                    })
                  )} />
              <span className='ml-2 text-gray-500'>Número de chasís</span>
            </label>
          </div>

          <div className='flex gap-4'>
            <label className='flex flex-col flex-1'>
              <InputField
                value={String(data.plate)}
                onChange={
                  ({ currentTarget }) => setData(
                    v => ({
                      ...v,
                      plate: String(currentTarget.value)
                    })
                  )} />
              <span className='ml-2 text-gray-500'>Placa</span>
            </label>

            <label className='flex flex-col flex-1'>
              <InputField
                value={String(data.color)}
                onChange={
                  ({ currentTarget }) => setData(
                    v => ({
                      ...v,
                      color: String(currentTarget.value)
                    })
                  )} />
              <span className='ml-2 text-gray-500'>Color</span>
            </label>
          </div>

          <div className='flex gap-4'>
            <label className='flex flex-col flex-1'>
              <InputField
                value={String(data.km)}
                onChange={
                  ({ currentTarget }) =>
                    validateNumber(currentTarget.value) && setData(
                      v => ({
                        ...v,
                        km: Number(currentTarget.value)
                      })
                    )} />
              <span className='ml-2 text-gray-500'>Kilometros recorridos</span>
            </label>

            <label className='flex flex-col flex-1 '>
              <InputField
                value={String(data.year)}
                onChange={
                  ({ currentTarget }) =>
                    validateNumber(currentTarget.value) && setData(
                      v => ({
                        ...v,
                        year: Number(currentTarget.value)
                      })
                    )} />
              <span className='ml-2 text-gray-500'>
                Año
              </span>
            </label>
          </div>

          <Loader active={loadingBrand || loadingClient} />
        </>
      </CustomModal>
    ),
    document.body
  )
}