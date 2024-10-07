import { InputField } from '@/component/ui/input'
import { useValidation } from '@/hooks/validations'
import { ActivityWithCostToDoItemEstimate } from '@/interfaces'
import clsx from 'clsx'
import { useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { toast } from 'react-toastify'
import { v4 } from 'uuid'


interface InputsGroupAddNewDataProps {
  onAdd: (v: ActivityWithCostToDoItemEstimate) => void
  small?: boolean
}

export const InputsGroupAddNewData = ({ onAdd, small }: InputsGroupAddNewDataProps) => {
  const { validateNumber } = useValidation()

  const [dataForm, setDataForm] = useState<ActivityWithCostToDoItemEstimate>({
    description: '',
    unitCost: 0,
    quantity: 1,
    total: 0
  })

  const onPush = () => {
    if (String(dataForm.description)?.length > 6) {
      const uuid = v4()

      // add data
      onAdd({
        ...dataForm,
        total: Number(dataForm.unitCost) * Number(dataForm.quantity),
        uuid
      })

      // clear all fields
      setDataForm({
        description: '',
        unitCost: 0,
        quantity: 1,
        total: 0
      })
    } else {
      toast.warning('Ingrese una descripción (Minimo 6 caracteres)')
    }
  }

  return (
    <div className={`flex gap-2 items-start ${clsx({ 'text-xs': small })}`}>
      <label className='flex flex-col w-24'>
        <InputField
          type='number'
          className='text-center'
          onChange={
            ({ currentTarget }) =>
              validateNumber(currentTarget.value) &&
              setDataForm(
                v => ({
                  ...v,
                  quantity: Number(currentTarget.value)
                })
              )}
          value={String(dataForm.quantity)}
          placeholder='Total' />
        <span className='ml-2 text-gray-500'>Cantidad</span>
      </label>

      <label className='flex flex-col flex-1'>
        <InputField
          autoFocus
          value={dataForm.description}
          onChange={
            ({ currentTarget }) => setDataForm(v => ({
              ...v,
              description: currentTarget.value
            }))
          } />
        <span className='ml-2 text-gray-500'>Descripción *</span>
      </label>

      <label className='flex flex-col w-1/6'>
        <InputField
          value={String(dataForm.unitCost)}
          className='text-center'
          onEnter={onPush}
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

      <button className='p-4 text-lg bg-gray-200 hover:bg-gray-400 rounded' onClick={onPush}>
        <MdAdd />
      </button>
    </div>
  )
}