import { useState } from 'react'
import { ActionsComponent } from '../ui/actions'
import { LayoutComponent } from '../ui/layout'
import { useAxios } from '@/hooks/fetch'
import { Endpoints } from '@/router'
import { Loader } from '../ui/loader'
import { TableComponent } from '../table'
import { UserPropierties } from '@/interfaces'
import { StatusUser } from './statusUser'
import dayjs from 'dayjs'
import { useAuth } from '@/hooks/auth'
import { NewAndUpdateUserModal } from '../modals/newUser'

export const UserList = () => {
  const { auth } = useAuth()
  const [filter, setFilter] = useState<string>('')
  const [isOpenNewUser, setOpenUser] = useState<boolean>(false)
  const { data, loading, error, refetch } = useAxios({ endpoint: Endpoints.GET_ALL_USERS })

  if (error) {
    return (
      <LayoutComponent>
        <p className='text-xl'>{error}</p>
      </LayoutComponent>
    )
  }

  return (
    <LayoutComponent>
      <ActionsComponent
        title='Usuarios Registrados'
        subtitle='Visualiza y gestiona todos tus usuarios registrados'
        searchTextPlaceholder='Buscar usuario, nombre..'
        textButton='Nuevo Usuario'
        onClickButton={() => setOpenUser(true)}
        onChangeFilterValue={setFilter} />

      {data && (
        <TableComponent
          data={[...data].map((user: UserPropierties) => ({
            'Nombre': <p>{user.name} {auth?._id === user._id && <span className='text-slate-400'>(Usuario Actual)</span>}</p>,
            'Correo': user.email,
            'Fecha Registro': dayjs(user.createdAt).format('lll'),
            'Estado': <StatusUser status={user.status} />
          }))}
          filter={filter}
        />
      )}

      {isOpenNewUser && <NewAndUpdateUserModal
        onUpdate={refetch}
        workshop={auth?.workshop}
        setOpen={setOpenUser} />}
      <Loader active={loading} />
    </LayoutComponent>
  )
}