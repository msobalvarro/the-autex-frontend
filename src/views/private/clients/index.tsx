import { ActionsComponent } from '@/component/ui/actions'
import { LayoutComponent } from '@/component/ui/layout'
import { TableComponent } from '@/component/table'
import { Client } from '@/interfaces'
import { useAxios } from '@/hooks/fetch'
import { Endpoints, routes } from '@/router'
import { useState } from 'react'
import { AssignVehiculeToClient } from '@/component/modals/assignVehiculeToClient'
import { Loader } from '@/component/ui/loader'
import { NewClient } from '@/component/modals/newClient'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

export const ClientView = () => {
  const navigate = useNavigate()
  const [isOpenModalNewClient, setOpenModalCient] = useState<boolean>(false)
  const [isOpenModalAssignVehicule, setOpenModalVehicule] = useState<boolean>(false)
  const [clientSelected, setClient] = useState<Client | null>(null)
  const [filter, setFilter] = useState<string>('')
  const { data, refetch, loading } = useAxios({ endpoint: Endpoints.GET_ALL_CLIENTS })

  return (
    <LayoutComponent>
      <ActionsComponent
        textButton='Nuevo Cliente'
        title='Clientes'
        subtitle='Visualiza y gestiona todos clientes registrados'
        onClickButton={() => setOpenModalCient(true)}
        onChangeFilterValue={setFilter} />

      <div className='flex-1'>
        <TableComponent
          filter={filter}
          renderEnum
          renderOptions
          onClickItem={(client: Client) => navigate(routes.CLIENT_DETAIL.replace(':id', String(client._id)))}
          options={[
            {
              label: 'Asignar vehículo',
              onClick: (e: Client) => {
                setClient(e)
                setOpenModalVehicule(true)
              }
            }
          ]}
          data={
            (Array.isArray(data) ? [...data] : []).map((item: Client) => ({
              'Nombre': item.name,
              'Correo Electrónico': item.email,
              'Numero Telefónico': item.phoneNumber,
              'Fecha de Registro': dayjs(item.createdAt).format('DD/MM/YYYY'),
              'Vehiculos': item.vehicules.length,
              '__item': item
            }))
          } />
      </div>

      {(isOpenModalAssignVehicule && clientSelected) && (
        <AssignVehiculeToClient
          onUpdate={refetch}
          client={clientSelected}
          setOpen={setOpenModalVehicule} />
      )}

      {isOpenModalNewClient && <NewClient onUpdate={refetch} setOpen={setOpenModalCient} />}

      <Loader active={loading} />

    </LayoutComponent>
  )
}