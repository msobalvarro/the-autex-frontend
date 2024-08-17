import { InputField } from '@/component/input'
import { useValidation } from '@/hooks/validations'
import { ActivityWithCostToDoItemEstimate } from '@/interfaces'
import { useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { toast } from 'react-toastify'


interface InputsGroupAddNewDataProps {
  onAdd: (v: ActivityWithCostToDoItemEstimate) => void
}

export const InputsGroupAddNewData = ({ onAdd }: InputsGroupAddNewDataProps) => {
  const { validateNumber } = useValidation()

  const [dataForm, setDataForm] = useState<ActivityWithCostToDoItemEstimate>({
    description: '',
    unitCost: 0,
    total: 0,
  })

  const handledClick = () => {
    if (dataForm.description?.length > 10) {
      // add data
      onAdd(dataForm)

      // clear all fields
      setDataForm({
        description: '',
        unitCost: 0,
        total: 0,
      })
    } else {
      toast.warning('Ingrese una descripción')
    }
  }

  return (
    <div className='flex gap-2 items-start'>
      <label className='flex flex-col w-4/5'>
        <InputField
          value={dataForm.description}
          onChange={
            ({ currentTarget }) => setDataForm(v => ({
              ...v,
              description: currentTarget.value
            }))
          } />
        <span className='ml-2 text-gray-500'>Descripción</span>
      </label>

      <label className='flex flex-col w-1/5'>
        <InputField
          value={String(dataForm.unitCost)}
          onChange={
            ({ currentTarget }) =>
              validateNumber(currentTarget.value) && setDataForm(
                v => ({
                  ...v,
                  unitCost: Number(currentTarget.value)
                })
              )} />
        <span className='ml-2 text-gray-500'>Costo Unidad</span>
      </label>


      <label className='flex flex-col w-1/5'>
        <InputField
          onChange={
            ({ currentTarget }) =>
              validateNumber(currentTarget.value) &&
              setDataForm(
                v => ({
                  ...v,
                  total: Number(currentTarget.value)
                })
              )}
          value={String(dataForm.total)}
          placeholder='Total' />
        <span className='ml-2 text-gray-500'>Total</span>
      </label>

      <button className='p-4 text-lg bg-gray-200 hover:bg-gray-400 rounded' onClick={handledClick}>
        <MdAdd />
      </button>
    </div>
  )
}