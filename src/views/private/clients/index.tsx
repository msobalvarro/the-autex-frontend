import { ActionsComponent } from '@/component/actions'
import { LayoutComponent } from '@/component/layout'
import { TableComponent } from '@/component/table'
import { Client } from '@/interfaces'
import { useAxios } from '@/hooks/fetch'
import { Endpoints } from '@/router'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'


export const ClientView = () => {
  const [filter, setFilter] = useState<string>('')
  const [dataFiltered, setData] = useState<object[]>()
  const { data } = useAxios({ endpoint: Endpoints.GET_ALL_CLIENTS })

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
      }))
      )
    }
  }, [filter, data])

  return (
    <LayoutComponent>
      <ActionsComponent
        textButton='Crear Presupuesto'
        title='Presupuesto'
        subtitle='Visualiza y gestiona todos los presupuestos registrados'
        onClickButton={() => { }}
        onChangeFilterValue={setFilter} />

      <div className='flex-1 bg-white'>
        <TableComponent data={dataFiltered} />
      </div>
    </LayoutComponent>
  )
}