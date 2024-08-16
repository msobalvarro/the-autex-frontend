interface Props {
  data?: Object[] | null
}

export const TableComponent = ({ data }: Props) => {
  if (!Array.isArray(data)) return null
  const firtRow = Array.isArray(data) ? data?.[0] : {}

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white border-collapse rounded-lg shadow-lg'>
        <thead>
          <tr>
            {Object.keys(firtRow).map((key) => (
              <th
                key={key}
                className='py-4 px-6 text-left uppercase tracking-wider text-xs font-semibold'>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={crypto.randomUUID()}
              className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors duration-300`}>
              {Object.values(item).map((value) => (
                <td
                  key={crypto.randomUUID()}
                  className='py-4 px-6 text-gray-700 text-sm'>
                  {String(value)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}