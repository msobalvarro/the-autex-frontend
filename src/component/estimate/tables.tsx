import _ from 'lodash'
import { useState } from 'react'
import { ActivityWithCostToDoItemEstimate, PropsResume } from '@/interfaces'
import { TableComponent } from '../table'
import { formatNumber } from '@/utils/formatNumber'
import { InputsGroupAddNewData } from './inputsGroupEstimate'
import { toast } from 'react-toastify'
import { axiosInstance } from '@/utils/http'
import { Endpoints } from '@/router'
import { Loader } from '../ui/loader'

export const Tables = ({ data, isEditMode, refetch }: PropsResume) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [additionalTaskList, setAdditionalTaskList] = useState<ActivityWithCostToDoItemEstimate[]>([])

  const onDeleteItemActivityToDoItem = async (id: string) => {
    setLoading(true)

    try {
      const { data: dataResponse, status } = await axiosInstance.post(Endpoints.DELETE_ACITIVITY_TO_DO_ITEM, {
        itemId: id,
        estimateId: data._id
      })

      if (status !== 200) {
        throw new Error(dataResponse)
      }

      toast.info('Elemento eliminado')
      refetch?.()
    } catch (error: any) {
      toast.error(String(error.response.data || error))
    } finally {
      setLoading(false)
    }
  }

  const onAddItemsActivitiesToDo = async () => {
    try {
      const { data: dataResponse, status } = await axiosInstance.post(Endpoints.ADD_ACITIVITY_TO_DO_ITEM, {
        activities: additionalTaskList,
        estimateId: data._id
      })

      if (status !== 200) {
        throw new Error(dataResponse)
      }

      setAdditionalTaskList([])
      refetch?.()
    } catch (error: any) {
      toast.error(String(error.response.data || error))
    }
  }

  return (
    <>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-4'>
          {additionalTaskList.length > 0 && (
            <button onClick={onAddItemsActivitiesToDo} className='hover:bg-gray-500 bg-gray-600 text-white px-3 py-1 rounded'>Actualizar</button>
          )}
          <p className='text-lg text-gray-600 uppercase'>Tareas adicionales Registradas</p>
        </div>

        <TableComponent
          renderEnum
          renderOptions={isEditMode}
          options={[
            {
              label: 'Eliminar',
              onClick: (e: ActivityWithCostToDoItemEstimate) => onDeleteItemActivityToDoItem(String(e._id))
            }
          ]}
          data={
            data?.activitiesToDo?.map(a => ({
              'Descripción': a.description,
              'Cantidad': a.quantity,
              'Costo Unitario': a.unitCost,
              'Total': formatNumber(Number(a.total)),
              '__item': a,
            })) || []
          } />

        {additionalTaskList.length > 0 && (
          <div className='flex flex-col gap-4 mt-4'>
            <p className='text-gray-500 text-xl'>Nuevas Tareas Adicionales</p>
            <TableComponent
              renderEnum
              renderOptions
              options={[
                {
                  label: 'Eliminar',
                  onClick: (data: ActivityWithCostToDoItemEstimate) => setAdditionalTaskList(
                    list => _.remove(list, e => e.description === data.description)
                  )
                }
              ]}
              data={
                additionalTaskList?.map(a => ({
                  'Descripción': a.description,
                  'Cantidad': a.quantity,
                  'Costo Unitario': a.unitCost,
                  'Total': formatNumber(Number(a.total)),
                  '__item': a,
                })) || []
              } />
          </div>
        )}

        {isEditMode && (
          <div className='self-end'>
            <InputsGroupAddNewData onAdd={v => setAdditionalTaskList(e => ([...e, v]))} />
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

      <Loader active={isLoading} />
    </>
  )
}
