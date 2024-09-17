import { Link } from 'react-router-dom'
import { FcSearch } from 'react-icons/fc'


export const NotFoundView = () => {
  return (
    <div className='min-h-screen absolute top-0 z-0 w-full flex flex-col items-center justify-center bg-gray-900 text-white'>
      <FcSearch className='text-9xl mt-10' />
      
      <h1 className='text-6xl font-bold mb-4'>404</h1>
      <p className='text-2xl mb-8'>Página no encontrada</p>
      <Link
        to='..'
        className='px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-colors'>
        Ir a Inicio
      </Link>
    </div>
  )
}