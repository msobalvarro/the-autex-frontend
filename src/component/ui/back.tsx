import { IoChevronBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export const BackButton = () => {
  const navigate = useNavigate()
  const onBack = () => navigate(-1)
  
  return (
    <button onClick={onBack} className='print:hidden flex items-center self-start gap-2 p-2 rounded hover:underline'>
      <IoChevronBack /> Volver
    </button>
  )
}