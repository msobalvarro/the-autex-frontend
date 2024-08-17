import { TableComponent } from '@/component/table'
import { ActivityWithCostToDoItemEstimate } from '@/interfaces'
import { useEffect, useState } from 'react'

interface TableProps {
  list: ActivityWithCostToDoItemEstimate[]
}

export const TableRepresentation = ({ list }: TableProps) => {
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
      <TableComponent renderEnum renderOptions data={dataFormated} />
    )
  }

  return null
}