import { ActionsComponent } from '@/component/actions'
import { LayoutComponent } from '@/component/layout'
import { TableComponent } from '@/component/table'
import { Client } from '@/interfaces'
import { useAxios } from '@/hooks/fetch'
import { Endpoints } from '@/router'
import { useEffect, useState } from 'react'
import { AssignVehiculeToClient } from '@/component/modals/assignVehiculeToClient'
import { Loader } from '@/component/loading'
import { NewClient } from '@/component/modals/newClient'
import dayjs from 'dayjs'

export const ClientView = () => {
  const [isOpenModalNewClient, setOpenModalCient] = useState<boolean>(false)
  const [isOpenModalAssignVehicule, setOpenModalVehicule] = useState<boolean>(false)
  const [clientSelected, setClient] = useState<Client | null>(null)
  const [filter, setFilter] = useState<string>('')
  const [dataFiltered, setData] = useState<object[]>()
  const { data, refetch, loading } = useAxios({ endpoint: Endpoints.GET_ALL_CLIENTS })

  useEffect(() => {
    if (data) {
      const lowercasedFilter = filter.toLowerCase()

      const filteredData: Client[] = [...data].filter(item =>
        Object.keys(item).some(key =>
          String(item[key]).toLowerCase().includes(lowercasedFilter)
        )
      )

      setData(filteredData.map((item: Client) => ({
        'Nombre': item.name,
        'Correo Electrónico': item.email,
        'Numero Telefónico': item.phoneNumber,
        'Fecha de Registro': dayjs(item.createdAt).format('DD/MM/YYYY'),
        'Vehiculos': item.vehicules.length,
        '__item': item
      })))
    }
  }, [filter, data])

  return (
    <LayoutComponent>
      <ActionsComponent
        textButton='Crear Cliente'
        title='Clientes'
        subtitle='Visualiza y gestiona todos clientes registrados'
        onClickButton={() => setOpenModalCient(true)}
        onChangeFilterValue={setFilter} />

      <div className='flex-1'>
        <TableComponent
          renderEnum
          renderOptions
          options={[
            {
              label: 'Asignar vehículo',
              onClick: (e: Client) => {
                setClient(e)
                setOpenModalVehicule(true)
              }
            }
          ]}
          data={dataFiltered} />
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