import { createPortal } from 'react-dom'

export interface ModalProps {
  isOpen: boolean
  setOpen: (value: boolean) => void
  children: React.ReactElement,
  showIcon?: boolean
}

export interface ModalMinimalProps {
  isOpen: boolean
  setOpen: (value: boolean) => void
}


export const CustomModal = ({ isOpen, setOpen, showIcon, children }: ModalProps) => {
  if (!isOpen) return null

  return createPortal((
    <div className='fixed inset-0 z-10 w-screen overflow-y-auto bg-[rgba(0,0,0,0.5)]'>
      <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
        <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
          <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
            <div className='sm:flex sm:items-start'>
              {showIcon && (
                <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                  <svg className='h-6 w-6 text-red-600' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'>
                    <path stroke-linecap='round' stroke-linejoin='round' d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z' />
                  </svg>
                </div>
              )}

              <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                {children}
              </div>
            </div>
          </div>
          <div className='bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
            <button type='button' className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto' onClick={() => setOpen(false)}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  ), document.body)
}