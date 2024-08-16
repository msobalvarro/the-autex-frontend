import clsx from 'clsx'
import { useState } from 'react'
import { IoIosSearch } from 'react-icons/io'


interface Props {
  placeholder: string
}

export const InputSearch = ({ placeholder }: Props) => {
  const [isFocus, setFocus] = useState<boolean>(false)

  return (
    <div className='relative flex-grow'>
      <input
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        type='text'
        placeholder={placeholder || 'Search...'}
        className={`w-full outline-none py-3 pl-4 pr-10 bg-white text-gray-900 transition rounded-lg border ${clsx({ 'shadow-lg': isFocus })}`}
      />
      <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
        <IoIosSearch className='text-gray-500 text-xl' />
      </div>
    </div>
  )
}