import { ActivityWithCostToDoItemEstimate } from '@/interfaces'
import { formatNumber } from '@/utils/formatNumber'
import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'
import { InputField } from '../ui/input'
import { useValidation } from '@/hooks/validations'
import { IoIosSave } from 'react-icons/io'

interface Props {
  activity: ActivityWithCostToDoItemEstimate
  onUpdateActivity: (activity: ActivityWithCostToDoItemEstimate) => void
  onDelete: () => void
}

export const ItemTableActivity = ({ activity, onUpdateActivity, onDelete }: Props) => {
  const { validateNumber } = useValidation()
  const [quantity, setQuantity] = useState<number>(Number(activity?.quantity))
  const [description, setDescription] = useState<string>(activity?.description || '')
  const [unitCost, setUnitCost] = useState<number>(Number(activity?.unitCost))
  const [isEditMode, toggleEditMode] = useState<boolean>(false)

  const update = () => {
    onUpdateActivity({
      ...activity,
      quantity,
      description,
      unitCost,
      total: quantity * unitCost,
    })
  }

  return (
    <tr className='text-gray-700'>
      <td className='text-center'>
        {isEditMode
          ? <InputField
            className='w-20 text-center'
            type='number'
            value={quantity}
            onChange={({ currentTarget }) => validateNumber(currentTarget.value) && setQuantity(Number(currentTarget.value))} />
          : activity.quantity
        }
      </td>
      <td className='flex-1 text-sm'>
        {
          isEditMode
            ? <InputField
              className='w-full'
              value={description}
              onChange={({ currentTarget }) => setDescription(currentTarget.value)} />
            : activity.description
        }
      </td>
      <td className='text-center'>
        {isEditMode
          ? <InputField
            className='w-20 text-center'
            value={unitCost}
            onChange={({ currentTarget }) => validateNumber(currentTarget.value) && setUnitCost(Number(currentTarget.value))} />
          : formatNumber(Number(activity.unitCost))
        }
      </td>
      <td>
        {
          isEditMode
            ? formatNumber(quantity * unitCost)
            : formatNumber(Number(activity.total))
        }
      </td>
      <td>
        {
          isEditMode
            ? (
              <div className='flex text-lg gap-1 justify-end'>
                <button onClick={update} className='p-2 rounded hover:bg-gray-100'>
                  <IoIosSave />
                </button>
              </div>
            )
            : (
              <div className='flex text-lg gap-1 justify-end'>
                <button onClick={() => toggleEditMode(true)} className='p-2 rounded hover:bg-gray-100'>
                  <MdModeEdit />
                </button>
                <button onClick={onDelete} className='p-2 rounded hover:bg-gray-100'>
                  <FaTrash className='text-rose-700' />
                </button>
              </div>
            )
        }

      </td>
    </tr>
  )
}