interface Props {
  data: Object[]
}

export const TableComponent = ({ data }: Props) => {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white border-collapse rounded-lg shadow-lg'>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
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
              key={index}
              className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-gray-100 transition-colors duration-300`}>
              {Object.values(item).map((value, idx) => (
                <td
                  key={idx}
                  className='py-4 px-6 text-gray-700 text-sm'>
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}