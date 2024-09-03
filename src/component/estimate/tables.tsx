import { PropsResume } from '@/interfaces'
import { TableComponent } from '../table'
import { formatNumber } from '@/utils/formatNumber'

export const Tables = ({ data }: PropsResume) => {
  return (
    <>
      <div className='flex flex-col gap-2'>
        <p className='text-lg text-gray-600 ml-2'>Actividades Previstas a Realizar</p>
        <TableComponent
          renderEnum
          data={
            data?.activitiesToDo?.map(a => ({
              'Descripción': a.description,
              'Cantidad': a.quantity,
              'Costo Unitario': a.unitCost,
              'Total': formatNumber(Number(a.total)),
              '__item': a,
            })) || []
          } />
      </div>

      <div className='flex flex-col gap-2'>
        <p className='text-lg text-gray-600 ml-2'>Partes Principales Requeridas</p>
        <TableComponent
          renderEnum
          data={
            data.requiredParts?.map(a => ({
              'Descripción': a.description,
              'Cantidad': a.quantity,
              'Costo Unitario': a.unitCost,
              'Total': formatNumber(Number(a.total)),
              '__item': a,
            })) || []
          } />
      </div>

      <div className='flex flex-col gap-2'>
        <p className='text-lg text-gray-600 ml-2'>Otros Requerimientos</p>
        <TableComponent
          renderEnum
          data={
            data.otherRequirements?.map(a => ({
              'Descripción': a.description,
              'Cantidad': a.quantity,
              'Costo Unitario': a.unitCost,
              'Total': formatNumber(Number(a.total))
            })) || []
          } />
      </div>

      <div className='flex flex-col gap-2'>
        <p className='text-lg text-gray-600 ml-2'>Actividades Externas</p>
        <TableComponent
          renderEnum
          data={
            data.externalActivities?.map(a => ({
              'Descripción': a.description,
              'Cantidad': a.quantity,
              'Costo Unitario': a.unitCost,
              'Total': formatNumber(Number(a.total))
            })) || []
          } />
      </div>
    </>
  )
}
