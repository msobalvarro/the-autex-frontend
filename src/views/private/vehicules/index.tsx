import { ActionsComponent } from '@/component/actions'
import { LayoutComponent } from '@/component/layout'
import { TableComponent } from '@/component/table'
import { Vehicule } from '@/interfaces'
import { useAxios } from '@/hooks/fetch'
import { Endpoints } from '@/router'
import { useEffect, useState } from 'react'
import { NewVehicule } from '@/component/modals/newVehicule'
import { Loader } from '@/component/loading'
import { NewbrandAndModel } from '@/component/modals/newBrand'

export const VehiculesView = () => {
  const [isOpenModal, setOpen] = useState({
    newVehicule: false,
    newModel: false,
    newBrand: false,
  })
  const [filter, setFilter] = useState<string>('')
  const [dataFiltered, setData] = useState<object[]>()
  const { data, refetch, loading } = useAxios({ endpoint: Endpoints.GET_ALL_VEHICULE })

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
        secondaryButtons={[
          {
            label: 'Crear Marca',
            onClick: () => setOpen(e => ({ ...e, newBrand: true }))
          },
          {
            label: 'Crear modelo',
            onClick: () => console.log('Crear model')
          },
        ]}
        subtitle='Visualiza y gestiona todos los vehiculos registrados'
        onClickButton={() => setOpen(e => ({ ...e, newVehicule: true }))}
        onChangeFilterValue={setFilter} />

      <div className='flex-1 bg-white'>
        <TableComponent data={dataFiltered} />
      </div>

      {isOpenModal.newVehicule && <NewVehicule setOpen={(is) => setOpen(e => ({ ...e, newVehicule: is }))} onUpdate={refetch} />}
      {isOpenModal.newBrand && <NewbrandAndModel setOpen={(is) => setOpen(e => ({ ...e, newBrand: is }))} onUpdate={refetch} />}

      <Loader active={loading} />
    </LayoutComponent>
  )
}