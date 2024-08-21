import { TableProps, ObjectPropsTable } from '@/interfaces'
import { MenuOptions } from './option'
import clsx from 'clsx'

export const TableComponent = ({
  data,
  renderEnum,
  renderOptions,
  options,
  onClickItem,
}: TableProps) => {
  const dataArray = Array.isArray(data) ? [...data] : []

  if (dataArray.length === 0) {
    return (
      <div >
        <p className='text-2xl text-gray-400 text-center'>No se encotraron registros</p>
      </div>
    )
  } else {
    const firstRow: ObjectPropsTable = Array.isArray(data) ? data?.[0] : {}
    return (
      <div className='overflow-visible'>
        <table className='min-w-full border-collapse rounded-lg'>
          <thead>
            <tr>
              {renderEnum && (<th />)}
              {Object.keys(firstRow).map((key) => key !== '__item' && (
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
            {data?.map((item, index) => (
              <tr
                onClick={() => onClickItem?.(item?.__item)}
                key={crypto.randomUUID()}
                className={`${clsx({
                  'bg-gray-100': index % 2 === 0
                })} hover:scale-105 hover:shadow-sm transition`}>
                {renderEnum && (<td className='text-right text-gray-700 text-sm font-bold'>{index + 1}</td>)}

                {Object.keys(item).map((key) => key !== '__item' && (
                  <td
                    key={crypto.randomUUID()}
                    className='py-4 px-6 text-gray-700 text-sm cursor-pointer'>
                    {`${item?.[key]}`}
                  </td>
                ))}

                {renderOptions && (
                  <MenuOptions
                    item={item?.['__item'] || {}}
                    options={options} />
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

}