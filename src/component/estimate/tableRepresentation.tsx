import { TableComponent } from '@/component/table'
import { ActivityWithCostToDoItemEstimate } from '@/interfaces'
import { useEffect, useState } from 'react'

interface TableProps {
  list: ActivityWithCostToDoItemEstimate[]
  onRemoveItems: (item: ActivityWithCostToDoItemEstimate) => void
  renderOptions?: boolean
}

export const TableRepresentation = ({ list, onRemoveItems,renderOptions }: TableProps) => {
  const [dataFormated, setData] = useState<object[]>([])

  useEffect(() => {
    if (list) {
      setData(list.map(item => ({
        'Descripción': item.description,
        'Costo unitario': item.unitCost,
        'Total': item.total,
        '__item': item,
      })))
    }
  }, [list])


  if (dataFormated.length) {
    return (
      <TableComponent
        renderEnum
        renderOptions={renderOptions}
        options={[
          {
            label: 'Eliminar',
            onClick: (e: ActivityWithCostToDoItemEstimate) => onRemoveItems(e)
          }
        ]}
        data={dataFormated} />
    )
  }

  return null
}