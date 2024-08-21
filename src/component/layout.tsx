import { Link, useNavigate } from 'react-router-dom'
import { IoChevronBack } from 'react-icons/io5'

interface AuxProps {
  children: React.ReactNode
  renderBack?: boolean
}

export const LayoutComponent = ({ children, renderBack }: AuxProps) => {
  const navigate = useNavigate()

  const onBack = () => navigate(-1)

  return (
    <div className='w-3/4 flex flex-col gap-4 mt-10'>
      {renderBack && (
        <button onClick={onBack} className='flex items-center self-start gap-2 p-2 rounded hover:bg-gray-200'>
          <IoChevronBack /> Volver
        </button>
      )}

      <div className='bg-gray-50 rounded p-8 flex-1 shadow-xl border flex flex-col gap-8'>
        {children}
      </div>
    </div>
  )
}