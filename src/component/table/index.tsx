import { TableProps } from '@/interfaces'
import { MenuOptions } from './option'

export const TableComponent = ({ data, renderEnum, renderOptions }: TableProps) => {
  if (!Array.isArray(data)) return null
  const firtRow = Array.isArray(data) ? data?.[0] : {}

  return (
    <div className='overflow-visible'>
      <table className='min-w-full bg-white border-collapse rounded-lg shadow-lg'>
        <thead>
          <tr>
            {renderEnum && (<th />)}
            {Object.keys(firtRow).map((key) => (
              <th
                key={key}
                className='py-4 px-6 text-left uppercase tracking-wider text-xs font-semibold'>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </th>
            ))}
            {renderOptions && (<th />)}
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr
              key={crypto.randomUUID()}
              className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors duration-300`}>
              {renderEnum && (<td className='text-right text-gray-700 text-sm font-bold'>{index + 1}</td>)}
              {Object.values(item).map((value) => (
                <td
                  key={crypto.randomUUID()}
                  className='py-4 px-6 text-gray-700 text-sm'>
                  {String(value)}
                </td>
              ))}
              {renderOptions && (
                <MenuOptions
                  item={item}
                  options={[
                    {
                      label: 'Eliminar',
                      onClick: (e) => console.log(e)
                    }
                  ]} />
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}