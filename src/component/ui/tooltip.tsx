import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  label: string
}

export const UiTooltip = ({ children, label }: Props) => {
  return (
    <div className='relative group'>
      {children}
      <div className='absolute left-1/2 transform -translate-x-1/2 w-max bg-gray-700 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        {label}
      </div>
    </div>
  )
}