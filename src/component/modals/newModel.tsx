import { useAxios } from '@/hooks/fetch'
import { ModalMinimalProps, CustomModal } from './layout'
import { Endpoints } from '@/router'
import { Loader } from '../loading'
import { InputField } from '../input'
import { TableComponent } from '../table'
import { VehiculeBrands, VehiculeModel } from '@/interfaces'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { CustomSelectOption } from '../selection'
import { axiosInstance } from '@/utils/http'

export const NewModel = ({ setOpen }: ModalMinimalProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [models, setModels] = useState<VehiculeModel[]>([])
  const [brandId, setBrand] = useState<string | null>(null)
  const [customModel, setCustomModel] = useState<string>('')
  const { data: dataBrands, loading: loadingBrands } = useAxios({
    endpoint: Endpoints.GET_ALL_BRAND_MODEL
  })

  const addModel = () => {
    try {
      if (customModel.trim().length === 0) {
        throw new Error('Ingrese un modelo')
      }

      setModels(m => [...m, { description: customModel }])
      setCustomModel('')

    } catch (error) {
      toast.error(String(error))
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
        models,
        brandId
      })

      if (response.status !== 200) {
        throw new Error(response.data)
      }

      toast.success(`Modelo agregado al sistema`)
      setOpen(false)
    } catch (error) {
      toast.error(String(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <CustomModal
      isOpen
      small
      subTitle='Crea un buevo modelo de una marca'
      navButtonsOptions={{
        renderBack: false,
        isFinally: true,
        onSuccess: submit
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
              placeholder='Cliente'
              className='flex-1'
              isLoading={loading}
              data={[...dataBrands].map((brand: VehiculeBrands) => ({
                label: brand.description,
                value: brand._id
              }))} />
          </div>
        )}


        {models.length > 0 && (
          <TableComponent renderEnum data={models.map(e => ({ 'Modelo': e.description }))} />
        )}

        <div className='flex flex-col'>
          <div className='pl-2'>
            <p className='text-lg text-gray-600 font-[600]'>Ingresa algunos modelos</p>
            <p className='text-sm text-gray-400'>Minimo 1 modelo *</p>
          </div>

          <div className='flex items-strech gap-2'>
            <InputField
              value={customModel}
              onChange={({ currentTarget }) => setCustomModel(currentTarget.value)}
              className='flex-1'
              placeholder='ingresa una marca' />

            <button onClick={addModel} className='p-2 rounded bg-gray-200 hover:bg-gray-300'>
              Agregar modelo
            </button>
          </div>
        </div>

        <Loader active={loadingBrands || loading} />
      </>
    </CustomModal>
  )
}