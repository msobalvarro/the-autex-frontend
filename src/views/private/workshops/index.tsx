import { ActionsComponent } from '@/component/actions'
import { LayoutComponent } from '@/component/layout'
import { Loader } from '@/component/loader'
import { NewUserModal } from '@/component/modals/newUser'
import { NewWorkshopModal } from '@/component/modals/newWorkshop'
import { WorkShopItem } from '@/component/workshop/workshopItem'
import { useAxios } from '@/hooks/fetch'
import { WorkshopPropierties } from '@/interfaces'
import { Endpoints } from '@/router'
import { useState } from 'react'

export const WorkshopsView = () => {
  const [workshopSelected, setWorkshop] = useState<WorkshopPropierties | null>(null)
  const [isOpenNewUser, toggleNewUser] = useState<boolean>(false)
  const [isOpenNewWokshop, toggleNewWokshop] = useState<boolean>(false)
  const [filter, setFilter] = useState<string>('')
  const { data, loading, refetch } = useAxios({ endpoint: Endpoints.GET_ALL_WORKSHOPS })
  const customData: WorkshopPropierties[] = Array.isArray(data) ? [...data] : []

  const onOpenNewUser = (workshop: WorkshopPropierties) => {
    setWorkshop(workshop)
    toggleNewUser(true)
  }
  
  return (
    <LayoutComponent>
      <ActionsComponent
        textButton='Nuevo Taller'
        title='Talleres'
        subtitle='Visualiza y gestiona todos los tallers y sus usuarios registrados'
        onClickButton={() => toggleNewWokshop(true)}
        onChangeFilterValue={setFilter} />

      <div className='flex gap-4'>
        {customData.map(workshop =>
          workshop.name.toLocaleLowerCase().search(filter.toLocaleLowerCase()) > -1 &&
          <WorkShopItem
            onNewUser={onOpenNewUser}
            workshop={workshop}
            key={crypto.randomUUID()} />)}
      </div>

      {isOpenNewWokshop && <NewWorkshopModal onUpdate={refetch} setOpen={toggleNewWokshop} />}
      {(isOpenNewUser && workshopSelected) && <NewUserModal onUpdate={refetch} workshop={workshopSelected} setOpen={toggleNewUser} />}
      <Loader active={loading} />
    </LayoutComponent>
  )
}