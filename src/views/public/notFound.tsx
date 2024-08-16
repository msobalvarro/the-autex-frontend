import { Link } from 'react-router-dom'

export const NotFoundView = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold mb-4'>404</h1>
        <p className='text-2xl mb-8'>Página no encontrada</p>
        <Link
          to='..'
          className='px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors'>
          Ir a Inicio
        </Link>
      </div>
    </div>
  )
}