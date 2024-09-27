import { ActionsComponent } from '@/component/ui/actions'
import { LayoutComponent } from '@/component/ui/layout'
import { VehiculeWithClient } from '@/interfaces'
import { useAxios } from '@/hooks/fetch'
import { Endpoints } from '@/router'
import { useState } from 'react'
import { NewVehicule } from '@/component/modals/newVehicule'
import { Loader } from '@/component/ui/loader'
import { NewbrandAndModel } from '@/component/modals/newBrand'
import { NewModel } from '@/component/modals/newModel'
import { VehiculeItemClient } from '@/component/client/vehiculeItem'
import { NewEstimation } from '@/component/modals/newEstimation'
import { v4 } from 'uuid'

export const VehiculesView = () => {
  const [vehiculeForEstimation, setVehicule] = useState<VehiculeWithClient | null>(null)
  const [openNewEstimation, setOpenEstimation] = useState<boolean>(false)
  const [isOpenModal, setOpen] = useState({
    newVehicule: false,
    newModel: false,
    newBrand: false,
  })
  const [filter, setFilter] = useState<string>('')
  const { data, refetch, loading } = useAxios({ endpoint: Endpoints.GET_ALL_VEHICULE })

  const openEstimation = (vehicule: VehiculeWithClient) => {
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
        {(Array.isArray(data) ? [...data] : []).map((item: VehiculeWithClient) => {
          const str = `
            ${item.brand?.description} 
            ${item.model?.description} 
            ${item.plate}
            ${item.type}
            ${item.year}
          `.toLocaleLowerCase()

          if (str.search(filter.toLocaleLowerCase()) > -1) {
            return (<VehiculeItemClient client={item?.client} onCreateEstimate={() => openEstimation(item)} key={v4()} vehicule={item} />)
          }
        })}
      </div>

      {isOpenModal.newVehicule && <NewVehicule setOpen={(is) => setOpen(e => ({ ...e, newVehicule: is }))} onUpdate={refetch} />}
      {isOpenModal.newBrand && <NewbrandAndModel setOpen={(is) => setOpen(e => ({ ...e, newBrand: is }))} onUpdate={refetch} />}
      {isOpenModal.newModel && <NewModel setOpen={(is) => setOpen(e => ({ ...e, newModel: is }))} onUpdate={refetch} />}
      {openNewEstimation && <NewEstimation client={vehiculeForEstimation?.client} vehicule={vehiculeForEstimation} isOpen setOpen={setOpenEstimation} />}
      <Loader active={loading} />
    </LayoutComponent>
  )
}