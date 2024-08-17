import { ModalProps } from '@/interfaces'
import { createPortal } from 'react-dom'
import { NavButtons } from '@/component/navButtons'
import { MdOutlineClose } from 'react-icons/md'

export interface ModalMinimalProps {
  onUpdate: () => void
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
  containerClassesNames,
  navButtonsOptions
}: ModalProps) => {
  if (!isOpen) return null

  return createPortal((
    <div className='fixed inset-0 z-10 w-full bg-[rgba(0,0,0,0.5)] justify-center items-center flex'>
      <div className='md:w-3/6 sm:w-5/6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 w-100'>
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

              <button className='text-2xl hover:bg-gray-100 rounded px-3' onClick={() => setOpen(false)}>
                <MdOutlineClose />
              </button>
            </div>

            <div className={`${containerClassesNames}`}>
              {children}
            </div>
          </div>
        </div>

        <NavButtons {...navButtonsOptions} />
      </div>
    </div>
  ), document.body)
}