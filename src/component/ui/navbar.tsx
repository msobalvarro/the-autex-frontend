import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { routes } from '@/router'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { logoutService } from '@/utils/auth'
import { useAuth } from '@/hooks/auth'

const itemClassName = 'rounded-md px-2 py-3 text-sm font-bold text-gray-300 hover:bg-gray-700 hover:text-white'

export const NavbarComponent = () => {
  const { auth } = useAuth()

  const [isOpenMenu, setOpenMenu] = useState<boolean>(false)
  const location = useLocation()
  const isActive = (route: string): boolean => `${location.pathname}`.search(route) > -1

  return (
    <nav className='bg-gray-800'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
            <div className='flex flex-shrink-0 items-center'>
              <img className='h-8 w-auto' src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500' alt='Your Company' />
            </div>
            <div className='hidden sm:ml-6 sm:block'>
              <div className='flex space-x-4'>
                <Link to={routes.CLIENTS} className={`${itemClassName} ${clsx({ 'bg-gray-700': isActive(routes.CLIENTS) })}`}>Clientes</Link>
                <Link to={routes.VEHICULES} className={`${itemClassName} ${clsx({ 'bg-gray-700': isActive(routes.VEHICULES) })}`}>Vehiculos</Link>
                <Link to={routes.ESTIMATE_SERVICE} className={`${itemClassName} ${clsx({ 'bg-gray-700': isActive(routes.ESTIMATE_SERVICE) })}`}>Presupuesto</Link>
                <Link to={routes.ORDER_SERVICE} className={`${itemClassName} ${clsx({ 'bg-gray-700': isActive(routes.ORDER_SERVICE) })}`}>Orden de Servicio</Link>
                {auth?.isRoot && (
                  <Link to={routes.WORKSHOPS} className={`${itemClassName} ${clsx({ 'bg-gray-700': isActive(routes.WORKSHOPS) })}`}>Talleres</Link>
                )}
                {auth?.isAdmin && (
                  <Link to={routes.WORKSHOP} className={`${itemClassName} ${clsx({ 'bg-gray-700': isActive(routes.WORKSHOP) })}`}>Mi Taller</Link>
                )}
                <Link to={routes.REPORTS} className={`${itemClassName} ${clsx({ 'bg-gray-700': isActive(routes.REPORTS) })}`}>Reportes</Link>
                <Link to={routes.DIAGNOSTIC} className={`${itemClassName}  ${clsx({ 'bg-gray-700': isActive(routes.DIAGNOSTIC) })}`}>Diagnóstico</Link>
              </div>
            </div>
          </div>

          <div className='absolute inset-y-0 right-0 flex items-center'>
            <div className='relative ml-3'>
              <button onClick={() => setOpenMenu(e => !e)} type='button' className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800' id='user-menu-button' aria-expanded='false' aria-haspopup='true'>
                <img className='h-8 w-8 rounded-full' src='https://placehold.co/400' alt='' />
              </button>

              {isOpenMenu && (
                <div className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none' role='menu' aria-orientation='vertical' aria-labelledby='user-menu-button'>
                  <a href='#' className='block px-4 py-2 text-sm text-gray-400' role='menuitem' id='user-menu-item-0'>Perfil {auth?.name?.split(' ')[0]}</a>
                  <a onClick={logoutService} href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200' role='menuitem' id='user-menu-item-2'>Cerrar Sesión</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='sm:hidden' id='mobile-menu'>
        <div className='space-y-1 px-2 pb-3 pt-2'>
          <a href='#' className='block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white' aria-current='page'>Dashboard</a>
          <a href='#' className='block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'>Team</a>
          <a href='#' className='block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'>Projects</a>
          <a href='#' className='block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'>Calendar</a>
        </div>
      </div>
    </nav>
  )
}
