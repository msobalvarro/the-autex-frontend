import { ActionsComponent } from '@/component/actions'
import { LayoutComponent } from '@/component/layout'
import { Loader } from '@/component/loader'
import { NewAndUpdateUserModal } from '@/component/modals/newUser'
import { NewWorkshopModal } from '@/component/modals/newWorkshop'
import { ConfirmAtiveToggleModal } from '@/component/workshop/confirm'
import { WorkShopItem } from '@/component/workshop/workshopItem'
import { useAxios } from '@/hooks/fetch'
import { User, WorkshopPropierties } from '@/interfaces'
import { Endpoints } from '@/router'
import { useState } from 'react'

export const WorkshopsView = () => {
  const [workshopSelected, setWorkshop] = useState<WorkshopPropierties | null>(null)
  const [userSelected, setUser] = useState<User | null>(null)
  const [isOpenConfirToggleActive, setToggleActiveUser] = useState<boolean>(false)
  const [isOpenNewUser, toggleNewUser] = useState<boolean>(false)
  const [isOpenNewWokshop, toggleNewWokshop] = useState<boolean>(false)
  const [filter, setFilter] = useState<string>('')
  const { data, loading, refetch } = useAxios({ endpoint: Endpoints.GET_ALL_WORKSHOPS })
  const customData: WorkshopPropierties[] = Array.isArray(data) ? [...data] : []

  const onOpenNewUser = (workshop: WorkshopPropierties) => {
    setWorkshop(workshop)
    toggleNewUser(true)
    setUser(null)
  }

  const onUpdateUserAndOpenModal = (user: User) => {
    setUser(user)
    toggleNewUser(true)
  }

  const onUpdateUserStatus = (user: User) => {
    setUser(user)
    setToggleActiveUser(true)
  }

  return (
    <LayoutComponent>
      <ActionsComponent
        textButton='Nuevo Taller'
        title='Talleres'
        subtitle='Visualiza y gestiona todos los tallers y sus usuarios registrados'
        onClickButton={() => toggleNewWokshop(true)}
        onChangeFilterValue={setFilter} />

      <div className='grid grid grid-cols-2 gap-4'>
        {customData.map(workshop =>
          workshop.name.toLocaleLowerCase().search(filter.toLocaleLowerCase()) > -1 &&
          <WorkShopItem
            onUpdateUser={onUpdateUserAndOpenModal}
            onActiveOrInactive={onUpdateUserStatus}
            onNewUser={onOpenNewUser}
            workshop={workshop}
            key={crypto.randomUUID()} />)}
      </div>

      {isOpenNewWokshop &&
        <NewWorkshopModal
          onUpdate={refetch}
          setOpen={toggleNewWokshop} />}

      {((isOpenNewUser && workshopSelected) || isOpenNewUser && userSelected) &&
        <NewAndUpdateUserModal
          defaultData={userSelected}
          onUpdate={refetch}
          workshop={workshopSelected}
          setOpen={toggleNewUser} />}

      {(isOpenConfirToggleActive && userSelected) && <ConfirmAtiveToggleModal onUpdate={refetch} user={userSelected} setOpen={setToggleActiveUser} />}
      <Loader active={loading} />
    </LayoutComponent>
  )
}