import dayjs from 'dayjs'
import { ActionsComponent } from '@/component/ui/actions'
import { LayoutComponent } from '@/component/ui/layout'
import { TableComponent } from '@/component/table'
import { Client } from '@/interfaces'
import { useAxios } from '@/hooks/fetch'
import { Endpoints, routes } from '@/router'
import { useState } from 'react'
import { Loader } from '@/component/ui/loader'
import { UpdateAndNewClient } from '@/component/modals/newClient'
import { Link } from 'react-router-dom'
import { MdEmail } from 'react-icons/md'
import { IoCall } from 'react-icons/io5'

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
              'Nombre': <Link className='text-sky-600 hover:underline' to={routes.CLIENT_DETAIL.replace(':id', String(item._id))}>{item.name}</Link>,
              'Correo Electrónico': (
                <a href={`mailto:${item.email}`} className='flex text-sky-600 hover:underline items-center gap-2'>
                  <MdEmail className='text-sm' />
                  {item.email}
                </a>
              ),
              'Numero Telefónico': (
                <a href={`tel:${item.phoneNumber}`} className='flex text-green-600 hover:underline items-center gap-2'>
                  <IoCall className='text-sm' />
                  {item.phoneNumber}
                </a>
              ),
              'Fecha de Registro': dayjs(item.createdAt).format('lll'),
              'Vehiculos': item.vehicules.length,
              '__item': item
            }))
          } />
      </div>

      {isOpenModalNewClient && <UpdateAndNewClient onUpdate={refetch} setOpen={setOpenModalCient} />}
      <Loader active={loading} />
    </LayoutComponent>
  )
}