import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { routes } from '@/router'
import { useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/auth'
import { SubMenuUser } from './menuUser'

const itemClassName = 'rounded-md px-2 py-3 text-sm font-semibold text-gray-300 hover:bg-gray-700 hover:text-white'

export const NavbarComponent = () => {
  const { auth } = useAuth()
  const location = useLocation()
  const isActive = (route: string): boolean => `${location.pathname}`.search(route) > -1

  return (
    <nav className='bg-gray-800 z-10 relative mb-10 print:hidden'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
            <div className='flex flex-shrink-0 items-center'>
              <img className='h-8 w-auto' src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500' alt='Your Company' />
            </div>
            <div className='hidden sm:ml-6 sm:block'>
              <div className='flex items-center space-x-4'>
                {auth?.isRoot && (
                  <Link to={routes.ROOT} className={`${itemClassName} ${clsx({ 'bg-gray-700': isActive(routes.ROOT) })}`}>Administración</Link>
                )}
                <Link to={routes.WORKSHOP} className={`${itemClassName} ${clsx({ 'bg-gray-700': isActive(routes.WORKSHOP) })}`}>Mi Taller</Link>
                <Link to={routes.ESTIMATE_SERVICE} className={`${itemClassName} ${clsx({ 'bg-gray-700': isActive(routes.ESTIMATE_SERVICE) })}`}>Presupuesto</Link>
                <Link to={routes.ORDER_SERVICE} className={`${itemClassName} ${clsx({ 'bg-gray-700': isActive(routes.ORDER_SERVICE) })}`}>Orden de Servicio</Link>
                <Link to={routes.REPORTS} className={`${itemClassName} ${clsx({ 'bg-gray-700': isActive(routes.REPORTS) })}`}>Reportes</Link>

                <button className={`${itemClassName} hover:bg-transparent relative flex items-center gap-2`} disabled>
                  Diagnóstico <span className='right-100 rounded-xl p-1 bg-sky-800 text-white text-xs'>Proximamente</span>
                </button>
                {/* <Link aria-disabled to={routes.DIAGNOSTIC} className={`${itemClassName} ${clsx({ 'bg-gray-700': isActive(routes.DIAGNOSTIC) })}`}>Diagnóstico</Link> */}
              </div>
            </div>
          </div>

          <SubMenuUser />
        </div>
      </div>
    </nav>
  )
}
