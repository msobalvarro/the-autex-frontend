import { IoIosSearch } from 'react-icons/io'


interface Props {
  placeholder: string
}

export const InputSearch = ({ placeholder }: Props) => {
  return (
    <div className='relative flex-grow'>
      <input
        type='text'
        name='query'
        placeholder={placeholder || 'Search...'}
        className='w-full outline-none py-3 pl-4 pr-10 bg-white text-gray-900 rounded-lg border'
      />
      <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
        <IoIosSearch className='text-gray-500 text-xl' />
      </div>
    </div>
  )
}