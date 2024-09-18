import dayjs from 'dayjs'
import { ActionsComponent } from '@/component/ui/actions'
import { LayoutComponent } from '@/component/ui/layout'
import { TableComponent } from '@/component/table'
import { Client } from '@/interfaces'
import { useAxios } from '@/hooks/fetch'
import { Endpoints, routes } from '@/router'
import { useState } from 'react'
import { Loader } from '@/component/ui/loader'
import { NewClient } from '@/component/modals/newClient'
import { Link } from 'react-router-dom'

export const ClientView = () => {
  const [isOpenModalNewClient, setOpenModalCient] = useState<boolean>(false)
  const [filter, setFilter] = useState<string>('')
  const { data, refetch, loading } = useAxios({ endpoint: Endpoints.GET_ALL_CLIENTS })

  return (
    <LayoutComponent>
      <ActionsComponent
        textButton='Nuevo Cliente'
        title='Clientes'
        subtitle='Visualiza y gestiona todos clientes registrados'
        searchTextPlaceholder='Buscar cliente'
        onClickButton={() => setOpenModalCient(true)}
        onChangeFilterValue={setFilter} />

      <div className='flex-1'>
        <TableComponent
          filter={filter}
          renderEnum
          data={
            (Array.isArray(data) ? [...data] : []).map((item: Client) => ({
              'Nombre': <Link className='text-sky-600 hover:underline' to={routes.CLIENT_DETAIL.replace(':id', String(item._id))}>{item.name}</Link> ,
              'Correo Electrónico': item.email,
              'Numero Telefónico': item.phoneNumber,
              'Fecha de Registro': dayjs(item.createdAt).format('DD/MM/YYYY'),
              'Vehiculos': item.vehicules.length,
              '__item': item
            }))
          } />
      </div>

      {isOpenModalNewClient && <NewClient onUpdate={refetch} setOpen={setOpenModalCient} />}
      <Loader active={loading} />
    </LayoutComponent>
  )
}