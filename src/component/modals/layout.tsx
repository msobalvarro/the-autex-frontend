import { ModalProps } from '@/interfaces'
import { createPortal } from 'react-dom'

export interface ModalMinimalProps {
  isOpen?: boolean
  setOpen: (value: boolean) => void
}


export const CustomModal = ({
  isOpen,
  setOpen,
  children,
  iconComponent,
  title,
  subTitle,
  textSubmit,
  containerClassesNames
}: ModalProps) => {
  if (!isOpen) return null

  return createPortal((
    <div className='fixed inset-0 z-10 w-full bg-[rgba(0,0,0,0.5)] justify-center items-center flex'>
      <div className='md:w-2/5 sm:w-5/6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 w-100'>
        <div className='px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
          <div className='flex flex-col gap-8'>
            <div className='flex gap-2'>
              {(iconComponent) && (
                <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 sm:mx-0 sm:h-10 sm:w-10'>
                  {iconComponent}
                </div>
              )}

              <div className='w-full'>
                <p className='text-xl uppercase font-bold text-gray-600'>{title}</p>
                <p className='text-sm text-gray-500'>{subTitle}</p>
              </div>
            </div>

            <div className={`${containerClassesNames}`}>
              {children}
            </div>
          </div>
        </div>

        <div className='bg-gray-100 px-4 py-3 sm:flex justify-end sm:px-6 gap-2 mt-6'>
          <button type='button' className='inline-flex w-full justify-center rounded-md bg-slate-400 px-3 py-2 text-white sm:w-auto' onClick={() => setOpen(false)}>Cancelar</button>
          <button type='button' className='inline-flex w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-white sm:w-auto'>{textSubmit || 'Enviar'}</button>
        </div>
      </div>
    </div>
  ), document.body)
}