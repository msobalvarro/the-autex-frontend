import { SyncLoader } from 'react-spinners'

interface Props {
  active: boolean
}

export const Loader = ({ active }: Props) => {
  if (active) {
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 z-50'>
        <SyncLoader
          color='#1f2937'
          className='text-gray-100'
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      </div>
    )
  }

  return null
}