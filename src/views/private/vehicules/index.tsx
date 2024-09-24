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
import { VehiculePlate } from '@/component/vehicule/plate'
import { VehiculeItemClient } from '@/component/client/vehiculeItem'
import { NewEstimation } from '@/component/modals/newEstimation'

export const VehiculesView = () => {
  const [vehiculeForEstimation, setVehicule] = useState<Vehicule | null>(null)
  const [openNewEstimation, setOpenEstimation] = useState<boolean>(false)
  const [isOpenModal, setOpen] = useState({
    newVehicule: false,
    newModel: false,
    newBrand: false,
  })
  const [filter, setFilter] = useState<string>('')
  const { data, refetch, loading } = useAxios({ endpoint: Endpoints.GET_ALL_VEHICULE })

  const openEstimation = (vehicule: Vehicule) => {
    setVehicule(vehicule)
    setOpenEstimation(true)
  }

  return (
    <LayoutComponent>
      <ActionsComponent
        textButton='Nuevo Vehiculo'
        title='Vehiculos'
        searchTextPlaceholder='Buscar vehiculo, marca..'
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

      <div className='flex-1 flex flex-col gap-2'>
        {/* <TableComponent
          filter={filter}
          data={.map(
            (item: Vehicule) => ({
              'Tipo': <b className='uppercase'>{item?.type}</b>,
              'Placa': <div className='flex'><VehiculePlate plate={String(item?.plate)} /></div>,
              'Unidad': `${item?.year} ${item.brand?.description} ${item.model?.description}`,
              'Color': item?.color,
            }))
          } /> */}

        {(Array.isArray(data) ? [...data] : []).map((item: Vehicule) => (
          <VehiculeItemClient onCreateEstimate={() => { }} key={crypto.randomUUID()} vehicule={item} />
        ))}
      </div>

      {isOpenModal.newVehicule && <NewVehicule setOpen={(is) => setOpen(e => ({ ...e, newVehicule: is }))} onUpdate={refetch} />}
      {isOpenModal.newBrand && <NewbrandAndModel setOpen={(is) => setOpen(e => ({ ...e, newBrand: is }))} onUpdate={refetch} />}
      {isOpenModal.newModel && <NewModel setOpen={(is) => setOpen(e => ({ ...e, newModel: is }))} onUpdate={refetch} />}
      {openNewEstimation && <NewEstimation client={client} vehicule={vehiculeForEstimation} isOpen setOpen={setOpenEstimation} />}
      <Loader active={loading} />
    </LayoutComponent>
  )
}