import _ from 'lodash'
import clsx from 'clsx'
import { TableProps, ObjectPropsTable } from '@/interfaces'
import { MenuOptions } from './option'
import { isValidElement, useEffect, useState } from 'react'
import { onlyText } from 'react-children-utilities'

export const TableComponent = ({
  data,
  renderEnum,
  renderOptions,
  options,
  onClickItem,
  filter,
}: TableProps) => {
  const [filteredData, setData] = useState<ObjectPropsTable[]>([])
  useEffect(() => {
    const arr = Array.isArray(data) ? [...data] : []
    const lowercasedFilter = filter?.toLowerCase() || ''

    setData(_.filter([...arr], i => {
      const childs: Array<ChildNode | string> = Object.values(i)
      const customChildStr: string[] = childs.map(child => isValidElement(child) ? onlyText(child) : String(child))
      return String(customChildStr).toLowerCase().search(lowercasedFilter) > -1
    }))
  }, [data, filter])

  if ((Array.isArray(data) ? [...data] : []).length == 0) {
    return <p className='text-2xl text-gray-400 text-center'>No se encotraron registros en la búsqueda</p>
  }

  if (filteredData.length === 0) {
    return (
      <div>
        <p className='text-2xl text-gray-400 text-center'>No se encotraron registros en la búsqueda</p>
      </div>
    )
  }

  const firstRow: ObjectPropsTable = Array.isArray(data) ? data?.[0] : {}
  return (
    <div className='overflow-visible'>
      <table className='min-w-full border-collapse rounded-lg'>
        <thead>
          <tr>
            {renderEnum && (<th />)}
            {Object.keys(firstRow).map((key) => key !== '__item' && (
              <th className='p-4 text-left uppercase tracking-wider text-xs text-gray-600 font-semibold' key={crypto.randomUUID()}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </th>
            ))}
            {renderOptions && (<th />)}
          </tr>
        </thead>

        <tbody>
          {filteredData?.map((item: ObjectPropsTable, index) => (
            <tr
              onClick={() => onClickItem?.(item.__item)}
              key={crypto.randomUUID()}
              className={`${clsx({
                'bg-gray-100': index % 2 === 0
              })} hover:shadow-sm transition`}>
              {renderEnum && (<td className='text-right text-gray-700 text-sm font-bold'>{index + 1}</td>)}

              {Object.keys(item).map((key) => key !== '__item' && (
                <td
                  key={crypto.randomUUID()}
                  className='py-4 px-6 text-gray-700 text-sm cursor-pointer'>
                  {item?.[key]}
                </td>
              ))}

              {renderOptions && (<MenuOptions item={item.__item || {}} options={options} />)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

}