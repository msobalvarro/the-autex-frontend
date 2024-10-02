import { ActivityWithCostToDoItemEstimate } from '@/interfaces'
import { ItemTableActivity } from './itemTableActivity'
import { v4 } from 'uuid'

interface TableProps {
  list: ActivityWithCostToDoItemEstimate[]
  onUpdateList: (activity: ActivityWithCostToDoItemEstimate[]) => void
}

interface TableHeaderProps {
  columns: string[]
}

const TableHeader = ({ columns }: TableHeaderProps) => {
  return (
    <thead className='bg-gray-100 rounded'>
      <tr>
        {columns.map((column) => (
          <th key={v4()} className='p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
            {column}
          </th>
        ))}
      </tr>
    </thead>
  )
}


interface TableBodyProps {
  data: ActivityWithCostToDoItemEstimate[]
}


export const TableRepresentation = ({ list, onUpdateList }: TableProps) => {

  const deleteItem = (activity: ActivityWithCostToDoItemEstimate) => {
    const data = [...list]
    const i = data.findIndex(item => item.description === activity.description)
    
    if (i >= 0) {
      onUpdateList(data.filter(act => act !== activity))
    }
}

  if (list.length) {
    return (
      <div className='flex flex-col'>
        <table className='min-w-full'>
          <TableHeader columns={['Cantidad', 'Descripción', 'Costo Unidad', 'Total', 'Opciones']} />
          <tbody className='bg-white divide-y divide-gray-100'>
            {list.map((act) => (
              <ItemTableActivity
                key={v4()}
                activity={act}
                onDelete={() => deleteItem(act)}
                onUpdateActivity={() => { }} />
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return null
}