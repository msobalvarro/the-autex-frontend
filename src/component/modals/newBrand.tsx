import { FaCar } from 'react-icons/fa'
import { CustomModal, ModalMinimalProps } from './layout'
import { useState } from 'react'
import { VehiculeModel } from '@/interfaces'
import { InputField } from '../ui/input'
import { toast } from 'react-toastify'
import { TableComponent } from '@/component/table'
import { Loader } from '@/component/ui/loader'
import { axiosInstance } from '@/utils/http'
import { Endpoints } from '@/router'

export const NewbrandAndModel = ({ setOpen }: ModalMinimalProps) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [models, setModels] = useState<VehiculeModel[]>([])
  const [customModel, setCustomModel] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const addModel = () => {
    try {
      if (customModel.trim().length === 0) {
        throw new Error('Ingrese un modelo')
      }

      setModels(m => [...m, { description: customModel }])
      setCustomModel('')

    } catch (error: any) {
      toast.error(String(error.response.data || error))
    }
  }

  const submit = async () => {
    setLoading(true)

    try {
      if (models.length === 0) {
        throw new Error('Ingresa al menos un Modelo')
      }

      const response = await axiosInstance.post(Endpoints.CREATE_VEHICULE_BRAND, {
        models,
        description
      })

      if (response.status !== 200) {
        throw new Error(response.data)
      }

      setOpen(false)
      toast.success(`Marca ${description} agregada al sistema`)
    } catch (error: any) {
      toast.error(String(error.response.data || error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <CustomModal
      small
      title='Marca'
      subTitle='Crea una nueva marca para relacionarla con un vehículo'
      iconComponent={<FaCar />}
      navButtonsOptions={{
        renderBack: false,
        isFinally: true,
        createText: 'Crear Marca',
        nextDisabled: isLoading,
        onSuccess: submit,
      }}
      containerClassesNames='gap-4 flex flex-col'
      isOpen
      setOpen={setOpen}>
      <>
        <label className='flex flex-col flex-1'>
          <InputField
            value={description}
            placeholder='Ingrese el nombre la marca'
            onChange={({ currentTarget }) => setDescription(currentTarget.value)} />
          <span className='ml-2 text-gray-500 font-[300]'>Marca de vehículo, moto, etc..</span>
        </label>

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

        <Loader active={isLoading} />
      </>
    </CustomModal>
  )
}