import { ActionsComponent } from '@/component/actions'
import { LayoutComponent } from '@/component/layout'
import { TableComponent } from '@/component/table'

const data = [
  { name: 'John Doe', age: 28, email: 'john@example.com' },
  { name: 'Jane Smith', age: 34, email: 'jane@example.com' },
  { name: 'Sam Green', age: 23, email: 'sam@example.com' },
]

export const EstimateServiceView = () => {
  return (
    <LayoutComponent>
      <ActionsComponent
        textButton='Crear'
        title='Titulo'
        subtitle='Sub titulo'
        onClickButton={() => { }}
        onChangeFilter={() => { }} />

      <div className='flex-1 bg-white'>
        <TableComponent data={data} />
      </div>
    </LayoutComponent>
  )
}