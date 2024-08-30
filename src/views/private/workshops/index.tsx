import { ActionsComponent } from '@/component/actions'
import { LayoutComponent } from '@/component/layout'
import { Loader } from '@/component/loader'
import { WorkShopItem } from '@/component/workshop/workshopItem'
import { useAxios } from '@/hooks/fetch'
import { WorkshopPropierties } from '@/interfaces'
import { Endpoints } from '@/router'
import { useState } from 'react'

export const WorkshopsView = () => {
  const [filter, setFilter] = useState<string>('')
  const { data, loading } = useAxios({ endpoint: Endpoints.GET_ALL_WORKSHOPS })

  const customData: WorkshopPropierties[] = Array.isArray(data) ? [...data] : []

  return (
    <LayoutComponent>
      <ActionsComponent
        textButton='Nuevo Taller'
        title='Talleres'
        subtitle='Visualiza y gestiona todos los tallers y sus usuarios registrados'
        onClickButton={() => { }}
        onChangeFilterValue={setFilter} />
      <p>Talleres y Usuarios</p>

      <div className='flex gap-4'>
        {customData.map(workshop => <WorkShopItem workshop={workshop} key={crypto.randomUUID()} />)}
      </div>

      <Loader active={loading} />
    </LayoutComponent>
  )
}