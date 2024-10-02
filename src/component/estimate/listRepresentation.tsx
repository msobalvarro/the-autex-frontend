import { InputsGroupAddNewData } from '@/component/estimate/inputsGroupEstimate'
import { TableRepresentation } from '@/component/estimate/tableRepresentation'
import { ActivityWithCostToDoItemEstimate } from '@/interfaces'

interface Props {
  onUpdate: (e: ActivityWithCostToDoItemEstimate[]) => void
  list: ActivityWithCostToDoItemEstimate[]
  title: string
}

export const ListRepresentation = ({ list, title, onUpdate }: Props) => {
  const onAdd = (e: ActivityWithCostToDoItemEstimate) => {
    onUpdate([...list, e])
  }

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-lg text-gray-600 uppercase'>{title}</p>

      {list.length > 0 && (
        <TableRepresentation onUpdateList={onUpdate} list={list} />
      )}

      <InputsGroupAddNewData small onAdd={onAdd} />
    </div>
  )
}
