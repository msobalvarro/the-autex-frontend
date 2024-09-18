import dayjs from 'dayjs'
import { ActionsComponent } from '@/component/ui/actions'
import { LayoutComponent } from '@/component/ui/layout'
import { Loader } from '@/component/ui/loader'
import { NewOrderService } from '@/component/modals/newOrderService'
import { TableComponent } from '@/component/table'
import { useAxios } from '@/hooks/fetch'
import { OrderServicePropierties } from '@/interfaces'
import { Endpoints, routes } from '@/router'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatusOrder } from '@/component/order/statusOrder'
import { VehiculePlate } from '@/component/vehicule/plate'

export const OrderServiceView = () => {
  const navigate = useNavigate()
  const [isOpenModal, setOpen] = useState<boolean>(false)
  const [filter, setFilter] = useState<string>('')
  const { data, loading, refetch } = useAxios({ endpoint: Endpoints.GET_ALL_ORDERS })

  return (
    <LayoutComponent>
      <ActionsComponent
        hiddeButton
        textButton='Nueva Orden'
        title='Orden de Servicio'
        subtitle='Visualiza y gestiona todas las ordenes creadas'
        searchTextPlaceholder='Buscar orden, vehiculo..'
        onClickButton={() => setOpen(true)}
        onChangeFilterValue={setFilter} />

      <div className='flex-1'>
        <TableComponent
          filter={filter}
          onClickItem={
            (order: OrderServicePropierties) => navigate(
              routes.ORDER_DETAIL.replace(':id', String(order._id))
            )
          }
          data={(Array.isArray(data) ? [...data] : []).map(
            (item: OrderServicePropierties) => ({
              'Fecha': dayjs(item.createdAt).format('D, MMM YYYY h:mm A'),
              // 'Orden ID': <code className='font-bold'>{item._id}</code>,
              'Vehiculo': `${item.estimateProps?.vehicule?.year} ${item.estimateProps?.vehicule?.brand?.description} ${item.estimateProps?.vehicule?.model?.description}`,
              'Placa': <div className='flex'><VehiculePlate plate={String(item.estimateProps?.vehicule?.plate)} /></div>,
              'Estado': <StatusOrder status={item.status} />,
              '__item': item
            }))
          } />
      </div>

      {isOpenModal && <NewOrderService onUpdate={refetch} setOpen={setOpen} />}

      <Loader active={loading} />
    </LayoutComponent>
  )
}