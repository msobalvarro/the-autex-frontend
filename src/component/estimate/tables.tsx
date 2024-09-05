import { useState } from 'react'
import { ActivityWithCostToDoItemEstimate, PropsResume } from '@/interfaces'
import { TableComponent } from '../table'
import { formatNumber } from '@/utils/formatNumber'
import { InputsGroupAddNewData } from './inputsGroupEstimate'

export const Tables = ({ data, isEditMode, refetch }: PropsResume) => {
  const [additionalTaskList, setAdditionalTaskList] = useState<ActivityWithCostToDoItemEstimate[]>([])
  return (
    <>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-4'>
          <button className='hover:bg-gray-500 bg-gray-600 text-white px-3 py-1 rounded'>Actualizar</button>
          <p className='text-lg text-gray-600 uppercase'>Tareas adicionales Registradas</p>
        </div>
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

        {isEditMode && (
          <div className='self-end'>
            <InputsGroupAddNewData onAdd={e => { }} />
          </div>
        )}
      </div>

      <hr />

      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-4'>
          <button className='hover:bg-gray-500 bg-gray-600 text-white px-3 py-1 rounded'>Actualizar</button>
          <p className='text-lg text-gray-600 uppercase'>Partes Principales Requeridas</p>
        </div>

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

        {isEditMode && (
          <div className='self-end'>
            <InputsGroupAddNewData onAdd={e => { }} />
          </div>
        )}
      </div>

      <hr />

      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-4'>
          <button className='hover:bg-gray-500 bg-gray-600 text-white px-3 py-1 rounded'>Actualizar</button>
          <p className='text-lg text-gray-600 uppercase'>Otros Requerimientos</p>
        </div>
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

        {isEditMode && (
          <div className='self-end'>
            <InputsGroupAddNewData onAdd={e => { }} />
          </div>
        )}
      </div>

      <hr />

      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-4'>
          <button className='hover:bg-gray-500 bg-gray-600 text-white px-3 py-1 rounded'>Actualizar</button>
          <p className='text-lg text-gray-600 uppercase'>Actividades Externas</p>
        </div>
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

        {isEditMode && (
          <div className='self-end'>
            <InputsGroupAddNewData onAdd={e => { }} />
          </div>
        )}
      </div>
    </>
  )
}
