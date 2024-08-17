import { InputField } from '@/component/input'
import { useValidation } from '@/hooks/validations'
import { ActivityWithCostToDoItemEstimate } from '@/interfaces'
import { useState } from 'react'
import { MdAdd } from 'react-icons/md'


interface InputsGroupAddNewDataProps {
  onAdd: (v: ActivityWithCostToDoItemEstimate) => void
}

export const InputsGroupAddNewData = ({ onAdd }: InputsGroupAddNewDataProps) => {
  const { validatNumber } = useValidation()

  const [dataForm, setDataForm] = useState<ActivityWithCostToDoItemEstimate>({
    description: '',
    unitCost: 0,
    total: 0,
  })

  const handledClick = () => {
    onAdd(dataForm)

    // clear all fields
    setDataForm({
      description: '',
      unitCost: 0,
      total: 0,
    })
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
        value={String(dataForm.unitCost)}
        onChange={({ currentTarget }) => validatNumber(currentTarget.value) && setDataForm(v => ({ ...v, unitCost: Number(currentTarget.value) }))}
        className=' w-1/4' />

      <InputField
        onChange={({ currentTarget }) => validatNumber(currentTarget.value) && setDataForm(v => ({ ...v, total: Number(currentTarget.value) }))}
        value={String(dataForm.total)}
        placeholder='Total'
        className='w-1/4' />

      <button className='p-2 px-4 text-lg bg-gray-200 hover:bg-gray-400 rounded' onClick={handledClick}>
        <MdAdd />
      </button>
    </div>
  )
}