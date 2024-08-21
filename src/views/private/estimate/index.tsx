import { NewEstimation } from '@/component/modals/newEstimation'
import { ActionsComponent } from '@/component/actions'
import { LayoutComponent } from '@/component/layout'
import { TableComponent } from '@/component/table'
import { EstimatePropierties } from '@/interfaces'
import { Loader } from '@/component/loader'
import { useAxios } from '@/hooks/fetch'
import { Endpoints, routes } from '@/router'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'


export const EstimateServiceView = () => {
  const navigate = useNavigate()
  const [isOpenModal, setOpen] = useState<boolean>(false)
  const [filter, setFilter] = useState<string>('')
  const { data, refetch, loading } = useAxios({ endpoint: Endpoints.GET_ALL_ESTIMATIONS })


  const goDetails = (item: EstimatePropierties) => {
    navigate(routes.ESTIMATE_DETAIL.replace(':id', `${item._id}`))
  }

  return (
    <LayoutComponent>
      <ActionsComponent
        textButton='Nuevo Presupuesto'
        title='Presupuesto'
        subtitle='Visualiza y gestiona todos los presupuestos registrados'
        onClickButton={() => setOpen(true)}
        onChangeFilterValue={setFilter} />

      <div className='flex-1'>
        {Array.isArray(data) && (
          <TableComponent
            filter={filter}
            onClickItem={goDetails}
            renderEnum
            data={[...data].map((item: EstimatePropierties) => ({
              'Cliente': item.client?.name,
              'Vehiculo': item.vehicule?.plate,
              'Fecha': dayjs(item.createdAt).format('DD/MM/YYYY hh:mm A'),
              'Total': item.total?.toLocaleString(),
              '__item': item,
            }))} />

        )}
      </div>

      <Loader active={loading} />

      {isOpenModal && <NewEstimation onUpdate={refetch} setOpen={setOpen} />}
    </LayoutComponent>
  )
}