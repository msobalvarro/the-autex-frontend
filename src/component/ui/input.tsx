import clsx from 'clsx'
import { useState, InputHTMLAttributes } from 'react'
import { IoIosSearch } from 'react-icons/io'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onEnter?: () => void
}


export const InputSearch = (props: Props) => {
  const [isFocus, setFocus] = useState<boolean>(false)
  return (
    <div className='relative flex-grow'>
      <input
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        type='text'
        {...props}
        className={`w-full text-sm w-46 outline-none py-3 pl-4 pr-10 bg-white text-gray-900 rounded-lg border border-gray-300 transition ${clsx({ 'shadow-lg': isFocus, })}`}
      />
      <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
        <IoIosSearch className='text-gray-500 text-xl' />
      </div>
    </div>
  )
}

export const InputField = (props: Props) => {
  const [isFocus, setFocus] = useState<boolean>(false)
  return (
    <input
      {...props}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
      onKeyDown={event => {
        if (event.key === 'Enter') {
          props?.onEnter?.()
        }
      }}
      className={`outline-none p-3 bg-white text-gray-900 transition rounded-lg border ${clsx({
        'shadow-md': isFocus,
        'border-gray-400': isFocus,
      })} ${props.className || ''}`}
    />
  )
}