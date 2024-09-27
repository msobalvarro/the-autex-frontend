import { useAuth } from '@/hooks/auth';
import { logoutService } from '@/utils/auth';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';

export const SubMenuUser = () => {
  const { auth } = useAuth()

  return (
    <div className='absolute inset-y-0 right-0 flex items-center'>
      <Popover placement='bottom-end'>
        <PopoverTrigger>
          <button type='button' className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800' id='user-menu-button' aria-expanded='false' aria-haspopup='true'>
            <img className='h-8 w-8 rounded-full' src='https://placehold.co/400' alt='' />
          </button>
        </PopoverTrigger>
        <PopoverContent className='bg-white p-0 rounded'>
          <div className='w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none' role='menu' aria-orientation='vertical' aria-labelledby='user-menu-button'>
            <a href='#' className='block px-4 py-2 text-sm text-gray-400' role='menuitem' id='user-menu-item-0'>Perfil {auth?.name?.split(' ')[0]}</a>
            <a onClick={logoutService} href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200' role='menuitem' id='user-menu-item-2'>Cerrar Sesión</a>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}