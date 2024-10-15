import dayjs from 'dayjs'
import { NewEstimation } from '@/component/modals/newEstimation'
import { ActionsComponent } from '@/component/ui/actions'
import { LayoutComponent } from '@/component/ui/layout'
import { TableComponent } from '@/component/table'
import { EstimatesResponseGetAll } from '@/interfaces'
import { Loader } from '@/component/ui/loader'
import { useAxios } from '@/hooks/fetch'
import { Endpoints, routes } from '@/router'
import { useState } from 'react'
import { formatNumber } from '@/utils/formatNumber'
import { ActivitiesModal } from '@/component/modals/acitivitiesGroup'
import { ActivitiesGroupPreviewModal } from '@/component/modals/activitiesGroupPreview'
import { Link } from 'react-router-dom'
import { VehiculePlate } from '@/component/vehicule/plate'
import { StatusOrder } from '@/component/order/statusOrder'


export const EstimateServiceView = () => {
  const [isOpenGroupView, setOpenGroupView] = useState<boolean>(false)
  const [isOpenModal, setOpen] = useState<boolean>(false)
  const [isOpenNewGroup, toggleGroupModal] = useState<boolean>(false)
  const [filter, setFilter] = useState<string>('')
  const { data, refetch, loading } = useAxios({ endpoint: Endpoints.GET_ALL_ESTIMATIONS })

  return (
    <LayoutComponent>
      <ActionsComponent
        textButton='Nuevo Presupuesto'
        title='Presupuesto'
        subtitle='Visualiza y gestiona todos los presupuestos registrados'
        searchTextPlaceholder='Buscar Presupuesto, clientes..'
        onClickButton={() => setOpen(true)}
        secondaryButtons={[
          {
            label: 'Ver Grupos de Actividades',
            onClick: () => setOpenGroupView(true)
          },
          {
            label: 'Nuevo Grupo de Actividades',
            onClick: () => toggleGroupModal(true)
          },
        ]}
        onChangeFilterValue={setFilter} />

      <div className='flex-1'>
        {Array.isArray(data) && (
          <TableComponent
            filter={filter}
            data={[...data].map((item: EstimatesResponseGetAll) => ({
              'Presupuesto ID': <Link className='text-sky-600 hover:underline' to={routes.ESTIMATE_DETAIL.replace(':id', `${item._id}`)}><code className='font-bold'>{item._id}</code></Link>,
              'Cliente': <Link className='text-sky-600 hover:underline' to={routes.CLIENT_DETAIL.replace(':id', `${item.client?._id}`)}>{item.client?.name}</Link>,
              'Vehiculo': <div className='flex'><VehiculePlate plate={String(item.vehicule?.plate)} /></div>,
              'Fecha': dayjs(item.createdAt).format('lll'),
              'Total': <p className='text-gray-600 font-bold'>{formatNumber(Number(item.total))}</p>,
              'Estado': (
                <div>
                  {item?.order
                    ? <StatusOrder status={item.order?.status} />
                    : <span className='text-xs text-gray-600'>Sin Orden</span>}
                </div>
              ),
              '__item': item,
            }))} />

        )}
      </div>

      <Loader active={loading} />

      {isOpenGroupView && <ActivitiesGroupPreviewModal setOpen={setOpenGroupView} />}
      {isOpenModal && <NewEstimation onUpdate={refetch} setOpen={setOpen} />}
      {isOpenNewGroup && <ActivitiesModal setOpen={toggleGroupModal} />}
    </LayoutComponent>
  )
}