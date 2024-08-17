import { NewEstimation } from '@/component/modals/newEstimation'
import { ActionsComponent } from '@/component/actions'
import { LayoutComponent } from '@/component/layout'
import { TableComponent } from '@/component/table'
import { EstimatePropierties } from '@/interfaces'
import { Loader } from '@/component/loading'
import { useAxios } from '@/hooks/fetch'
import { Endpoints } from '@/router'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'


export const EstimateServiceView = () => {
  const [isOpenModal, setOpen] = useState<boolean>(false)
  const [filter, setFilter] = useState<string>('')
  const [dataFiltered, setData] = useState<object[]>()
  const { data, refetch, loading } = useAxios({ endpoint: Endpoints.GET_ALL_ESTIMATIONS })

  useEffect(() => {
    if (data) {
      const lowercasedFilter = filter.toLowerCase()

      const filteredData: EstimatePropierties[] = [...data].filter(item =>
        Object.keys(item).some(key =>
          String(item[key]).toLowerCase().includes(lowercasedFilter)
        )
      )

      setData(filteredData.map((item: EstimatePropierties) => ({
        'Cliente': item.client?.name,
        'Vehiculo': item.vehicule?.plate,
        'Fecha': dayjs(item.createdAt).format('DD/MM/YYYY'),
        'Total': item.total?.toLocaleString()
      }))
      )
    }
  }, [filter, data])

  return (
    <LayoutComponent>
      <ActionsComponent
        textButton='Crear Presupuesto'
        title='Presupuesto'
        subtitle='Visualiza y gestiona todos los presupuestos registrados'
        onClickButton={() => setOpen(true)}
        onChangeFilterValue={setFilter} />

      <div className='flex-1 bg-white'>
        <TableComponent renderEnum data={dataFiltered} />
      </div>

      <Loader active={loading} />

      {isOpenModal && <NewEstimation onUpdate={refetch} setOpen={setOpen} />}
    </LayoutComponent>
  )
}