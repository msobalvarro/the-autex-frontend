import { ActionsComponent } from '@/component/actions'
import { LayoutComponent } from '@/component/layout'
import { NewOrderService } from '@/component/modals/newOrderService'
import { useState } from 'react'

export const OrderServiceView = () => {
  const [isOpenModal, setOpen] = useState<boolean>(false)
  const [filter, setFilter] = useState<string>('')

  return (
    <LayoutComponent>
      <ActionsComponent
        textButton='Nueva Orden'
        title='Orden de Servicio'
        subtitle='Visualiza y gestiona todas las ordenes creadas'
        onClickButton={() => setOpen(true)}
        onChangeFilterValue={setFilter} />

      {isOpenModal && <NewOrderService setOpen={setOpen} />}
    </LayoutComponent>
  )
}