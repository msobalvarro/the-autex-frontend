import { TableSubMenuProps } from '@/interfaces'
import { useState } from 'react'
import { IoMdMore } from 'react-icons/io'

interface MenuProps {
  options: TableSubMenuProps[]
  item: object
}

export const MenuOptions = ({ options, item }: MenuProps) => {
  const [isOpen, setOpen] = useState<boolean>(false)

  const onSelectOptions = (fn?: (e: any) => void) => {
    setOpen(false)
    fn?.(item)
  }

  return (
    <td className='tcenter relative text-gray-700 text-2xl cursor-pointer relative' data-dropdown-toggle='dropdown'>
      <button onClick={() => setOpen(!isOpen)}>
        <IoMdMore />

        {(isOpen && options.length > 0) && (
          <div id='dropdown' className='z-10 absolute right-0 top-50 bg-white divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700'>
            <ul className='py-2 text-sm text-left text-gray-700 dark:text-gray-200'>
              {options.map(option => (
                <li key={crypto.randomUUID()}>
                  <a href='#' onClick={() => onSelectOptions(option.onClick)} className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                    {option.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </button>
    </td>
  )
}
