import { ActionsComponent } from '@/component/ui/actions'
import { LayoutComponent } from '@/component/ui/layout'
import { TableComponent } from '@/component/table'
import { Vehicule } from '@/interfaces'
import { useAxios } from '@/hooks/fetch'
import { Endpoints } from '@/router'
import { useState } from 'react'
import { NewVehicule } from '@/component/modals/newVehicule'
import { Loader } from '@/component/ui/loader'
import { NewbrandAndModel } from '@/component/modals/newBrand'
import { NewModel } from '@/component/modals/newModel'

export const VehiculesView = () => {
  const [isOpenModal, setOpen] = useState({
    newVehicule: false,
    newModel: false,
    newBrand: false,
  })
  const [filter, setFilter] = useState<string>('')
  const { data, refetch, loading } = useAxios({ endpoint: Endpoints.GET_ALL_VEHICULE })

  return (
    <LayoutComponent>
      <ActionsComponent
        textButton='Nuevo Vehiculo'
        title='Vehiculo'
        secondaryButtons={[
          {
            label: 'Crear Marca',
            onClick: () => setOpen(e => ({ ...e, newBrand: true }))
          },
          {
            label: 'Crear modelo',
            onClick: () => setOpen(e => ({ ...e, newModel: true }))
          },
        ]}
        subtitle='Visualiza y gestiona todos los vehiculos registrados'
        onClickButton={() => setOpen(e => ({ ...e, newVehicule: true }))}
        onChangeFilterValue={setFilter} />

      <div className='flex-1'>
        <TableComponent
          filter={filter}
          data={(Array.isArray(data) ? [...data] : []).map(
          (item: Vehicule) => ({
            'Marca': item.brand?.description,
            'Modelo': item.model?.description,
            'Año': item?.year,
            'Color': item?.color,
            'Placa': item?.plate,
          }))
        } />
      </div>

      {isOpenModal.newVehicule && <NewVehicule setOpen={(is) => setOpen(e => ({ ...e, newVehicule: is }))} onUpdate={refetch} />}
      {isOpenModal.newBrand && <NewbrandAndModel setOpen={(is) => setOpen(e => ({ ...e, newBrand: is }))} onUpdate={refetch} />}
      {isOpenModal.newModel && <NewModel setOpen={(is) => setOpen(e => ({ ...e, newModel: is }))} onUpdate={refetch} />}

      <Loader active={loading} />
    </LayoutComponent>
  )
}