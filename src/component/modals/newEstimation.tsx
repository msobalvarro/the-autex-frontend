import { CustomModal, ModalMinimalProps } from '@/component/modals/layout'
import { InputField } from '@/component/input'
import { TableComponent } from '@/component/table'
import { CustomSelectOption } from '@/component/selection'
import { useAxios } from '@/hooks/fetch'
import { ActivityWithCostToDoItemEstimate, Client, SelectionProps } from '@/interfaces'
import { Endpoints } from '@/router'
import { useEffect, useState } from 'react'
import { RiCalculatorFill } from 'react-icons/ri'
import { MdAdd } from 'react-icons/md'
import { useValidation } from '@/hooks/validations'

interface TableProps {
  list: ActivityWithCostToDoItemEstimate[]
}

const TableRepresentation = ({ list }: TableProps) => {
  const [dataFormated, setData] = useState<object[]>([])

  useEffect(() => {
    if (list) {
      setData(list.map(item => ({
        'Descripción': item.description,
        'Costo unitario': item.unitCost,
        'Total': item.total,
      })))
    }
  }, [list])


  if (dataFormated.length) {
    return (
      <TableComponent data={dataFormated} />
    )
  }

  return null
}

interface InputsGroupAddNewDataProps {
  onAdd: (v: ActivityWithCostToDoItemEstimate) => void
}

const InputsGroupAddNewData = ({ onAdd }: InputsGroupAddNewDataProps) => {
  const { validatNumber } = useValidation()

  const [dataForm, setDataForm] = useState<ActivityWithCostToDoItemEstimate>({
    description: '',
    unitCost: 0,
    total: 0,
  })

  const handledClick = () => {
    onAdd(dataForm)
    setDataForm({})
  }

  return (
    <div className='flex gap-2'>
      <InputField
        placeholder='Descripcion'
        value={dataForm.description}
        onChange={({ currentTarget }) => setDataForm(v => ({ ...v, description: currentTarget.value }))}
        className='w-4/5' />

      <InputField
        placeholder='Costo Unidad'
        onChange={({ currentTarget }) => validatNumber(currentTarget.value) && setDataForm(v => ({ ...v, unitCost: Number(currentTarget.value) }))}
        className=' w-1/4' />

      <InputField
        onChange={({ currentTarget }) => validatNumber(currentTarget.value) && setDataForm(v => ({ ...v, total: Number(currentTarget.value) }))}
        placeholder='Total'
        className='w-1/4' />

      <button className='p-2 px-4 text-lg bg-gray-200 hover:bg-gray-400 rounded' onClick={handledClick}>
        <MdAdd />
      </button>
    </div>
  )
}

const Icon = <RiCalculatorFill className='text-gray-600 text-xl' />

export const NewEstimation = ({ setOpen }: ModalMinimalProps) => {
  const [clientSelect, setClient] = useState<string | null>(null)
  const [carSelected, setCar] = useState<string | null>(null)
  const [clientList, setClientList] = useState<SelectionProps[]>([])
  const [carsList, setCarsList] = useState<SelectionProps[]>([])
  const [acitivities, setAcitivities] = useState<ActivityWithCostToDoItemEstimate[]>([])
  const [partsRequired, setPartRequires] = useState<ActivityWithCostToDoItemEstimate[]>([])
  const [otherRequirements, setOtherRequirements] = useState<ActivityWithCostToDoItemEstimate[]>([])
  const { data: dataClients, loading } = useAxios({ endpoint: Endpoints.GET_ALL_CLIENTS_WITH_CARS })

  useEffect(() => {
    if (dataClients && Array.isArray(dataClients)) {
      setClientList([...dataClients]?.map((item: Client) => ({
        'label': item.name,
        'value': item._id,
      })))
    }
  }, [dataClients])

  useEffect(() => {
    if (clientSelect && Array.isArray(dataClients)) {
      const indexFinded = [...dataClients].findIndex((c: Client) => c._id === clientSelect)

      if (indexFinded > -1) {
        setCarsList(dataClients[indexFinded]?.['vehicules'])
      }
    }
  }, [clientSelect])

  const addActivity = (activity: ActivityWithCostToDoItemEstimate) => {
    setAcitivities([...acitivities, activity])
  }

  const addParts = (activity: ActivityWithCostToDoItemEstimate) => {
    setPartRequires([...acitivities, activity])
  }

  const addOtherRequirements = (activity: ActivityWithCostToDoItemEstimate) => {
    setOtherRequirements([...acitivities, activity])
  }

  return (
    <CustomModal
      isOpen={true}
      setOpen={setOpen}
      title='Nuevo Presupuesto'
      subTitle='Crea nuevo presupuesto para un cliente'
      containerClassesNames='flex flex-col gap-8'
      iconComponent={Icon}>
      <>

        <div>
          <div className='flex flex-row flex-1 gap-2 justify-stretch'>
            <CustomSelectOption
              onChange={(e) => setClient(String(e?.value))}
              placeholder='Cliente'
              className='flex-1'
              isLoading={loading}
              data={clientList} />

            <CustomSelectOption
              isDisabled={!clientSelect}
              placeholder='Vehículo'
              onChange={(e) => setCar(String(e?.value))}
              className='flex-1'
              data={carsList} />
          </div>

          {clientSelect && carsList.length === 0 && (
            <p className='text-red-400 text-sm mt-1'>No se encontraron vehiculos a este cliente</p>
          )}
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-lg text-gray-400 uppercase'>Actividades Previstas a Realizar</p>
          <InputsGroupAddNewData onAdd={addActivity} />

          {acitivities.length > 0 && <TableRepresentation list={acitivities} />}
        </div>

        <hr />

        <div className='flex flex-col gap-1'>
          <p className='text-lg text-gray-400 uppercase'>Partes Principaes Requeridas</p>
          <InputsGroupAddNewData onAdd={addParts} />

          {partsRequired.length > 0 && <TableRepresentation list={partsRequired} />}
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-lg text-gray-400 uppercase'>Partes Principaes Requeridas</p>
          <InputsGroupAddNewData onAdd={addOtherRequirements} />

          {otherRequirements.length > 0 && <TableRepresentation list={otherRequirements} />}
        </div>
      </>
    </CustomModal>
  )
}
