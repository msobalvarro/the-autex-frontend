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

export const UserList = () => {
  const { auth } = useAuth()
  const [filter, setFilter] = useState<string>('')
  const { data, loading, error } = useAxios({ endpoint: Endpoints.GET_ALL_USERS })

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
        onClickButton={() => { }}
        onChangeFilterValue={setFilter} />

      {data && (
        <TableComponent
          data={[...data].map((user: UserPropierties) => ({
            'Nombre': <p>{user.name} {auth?._id === user._id && <b className='text-blue-400'>(Usuario Actual)</b>}</p>,
            'Correo': user.email,
            'Fecha Registro': dayjs(user.createdAt).format('lll'),
            'Estado': <StatusUser status={user.status} />
          }))}
          filter={filter}
        />
      )}

      <Loader active={loading} />
    </LayoutComponent>
  )
}