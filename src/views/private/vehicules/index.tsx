import { ActionsComponent } from '@/component/actions'
import { LayoutComponent } from '@/component/layout'
import { TableComponent } from '@/component/table'
import { Vehicule } from '@/interfaces'
import { useAxios } from '@/hooks/fetch'
import { Endpoints } from '@/router'
import { useEffect, useState } from 'react'
import { NewVehicule } from '@/component/modals/newVehicule'


export const VehiculesView = () => {
  const [isOpenModal, setOpen] = useState<boolean>(false)
  const [filter, setFilter] = useState<string>('')
  const [dataFiltered, setData] = useState<object[]>()
  const { data, refetch } = useAxios({ endpoint: Endpoints.GET_ALL_VEHICULE })

  useEffect(() => {
    if (data) {
      const lowercasedFilter = filter.toLowerCase()

      const filteredData: Vehicule[] = [...data].filter(item =>
        Object.keys(item).some(key =>
          String(item[key]).toLowerCase().includes(lowercasedFilter)
        )
      )

      setData(
        filteredData.map(
          (item: Vehicule) => ({
            'Marca': item.brand?.description,
            'Modelo': item.model?.description,
            'Año': item?.year,
            'Placa': item?.plate,
          })
        )
      )
    }
  }, [filter, data])

  return (
    <LayoutComponent>
      <ActionsComponent
        textButton='Crear Vehiculo'
        title='Vehiculo'
        subtitle='Visualiza y gestiona todos los vehiculos registrados'
        onClickButton={() => setOpen(true)}
        onChangeFilterValue={setFilter} />

      <div className='flex-1 bg-white'>
        <TableComponent data={dataFiltered} />
      </div>

      {isOpenModal && <NewVehicule setOpen={setOpen} onUpdate={refetch} />}

    </LayoutComponent>
  )
}