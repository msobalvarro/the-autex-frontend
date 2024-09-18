import _ from 'lodash'
import { useAxios } from '@/hooks/fetch'
import { ModalMinimalProps, CustomModal } from './layout'
import { Endpoints } from '@/router'
import { Loader } from '../ui/loader'
import { InputField } from '../ui/input'
import { TableComponent } from '../table'
import { VehiculeBrands, VehiculeModel } from '@/interfaces'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { CustomSelectOption } from '../ui/selection'
import { axiosInstance } from '@/utils/http'

export const NewModel= ({ setOpen }: ModalMinimalProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [models, setModels] = useState<VehiculeModel[]>([])
  const [brandId, setBrand] = useState<string | null>(null)
  const [customModelName, setCustomModel] = useState<string>('')
  const { data: dataBrands, loading: loadingBrands, refetch } = useAxios({
    endpoint: Endpoints.GET_ALL_BRAND_MODEL
  })

  const brands: VehiculeBrands[] = Array.isArray(dataBrands) ? [...dataBrands] : []

  const addModel = () => {
    try {
      if (customModelName.trim().length === 0) {
        throw new Error('Ingrese un modelo')
      }

      const newModel = { description: customModelName, _id: _.uniqueId() }
      setModels(m => [...m, newModel])
      setCustomModel('')
    } catch (error: any) {
      toast.error(String(error.response.data || error))
    }
  }

  const submit = async () => {
    setLoading(true)

    try {
      if (!brandId) {
        throw new Error('Selecciona una marca')
      }

      if (models.length === 0) {
        throw new Error('Ingresa al menos un modelo')
      }

      const response = await axiosInstance.post(Endpoints.CREATE_MULTIPLE_BRANDS, {
        models: models.map(model => ({ description: model.description })),
        brandId
      })

      if (response.status !== 200) {
        throw new Error(response.data)
      }

      toast.success(`Modelo agregado al sistema`)
      refetch()
      setModels([])
    } catch (error: any) {
      toast.error(String(error.response.data || error))
    } finally {
      setLoading(false)
    }
  }

  const modelExisting = brands.find(brand => brand._id === brandId)

  return (
    <CustomModal
      isOpen
      small
      subTitle='Crea un buevo modelo de una marca'
      navButtonsOptions={{
        renderBack: false,
        isFinally: true,
        onSuccess: submit,
        nextDisabled: models.length == 0 || !brandId
      }}
      containerClassesNames='flex flex-col gap-4'
      setOpen={setOpen}
      title='Nuevo modelo'>
      <>
        {Array.isArray(dataBrands) && (
          <div>
            <p className='text-md ml-2 text-gray-400'>Selecciona una marca</p>
            <CustomSelectOption
              onChange={(e) => setBrand(String(e?.value))}
              placeholder='Ninguna Marca seleccionada'
              className='flex-1'
              isLoading={loading}
              data={[...dataBrands].map((brand: VehiculeBrands) => ({
                label: brand.description,
                value: brand._id
              }))} />
          </div>
        )}

        {modelExisting && (
          <div className='flex flex-col gap-2'>
            <p>Modelos Existentes</p>
            <TableComponent
              renderEnum
              renderOptions
              data={
                modelExisting.models.map(
                  e => ({
                    'Modelo': e.description,
                    '__item': { _id: e._id }
                  })
                )
              } />
          </div>
        )}

        <hr />

        {models.length > 0 && (
          <TableComponent
            renderEnum
            renderOptions
            options={[
              {
                label: 'Eliminar',
                onClick: ({ _id }: VehiculeModel) => {
                  setModels(models => models.filter(model => model._id != _id))
                }
              }
            ]}
            data={
              models.map(
                e => ({
                  'Modelo': e.description,
                  '__item': { _id: e._id }
                })
              )
            } />
        )}

        <div className='flex flex-col'>
          <div className='pl-2'>
            <p className='text-lg text-gray-600 font-[600]'>Ingresa algunos modelos</p>
            <p className='text-sm text-gray-400'>Minimo 1 modelo *</p>
          </div>

          <div className='flex items-strech gap-2'>
            <InputField
              value={customModelName}
              onChange={({ currentTarget }) => setCustomModel(currentTarget.value)}
              className='flex-1'
              placeholder='ingresa una marca' />

            <button onClick={addModel} className='p-2 rounded bg-gray-600 text-white'>
              Agregar modelo
            </button>
          </div>
        </div>

        <Loader active={loadingBrands || loading} />
      </>
    </CustomModal>
  )
}