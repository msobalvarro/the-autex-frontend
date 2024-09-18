import { ModalProps } from '@/interfaces'
import { createPortal } from 'react-dom'
import { NavButtons } from '@/component/ui/navButtons'
import { MdOutlineClose } from 'react-icons/md'
import clsx from 'clsx'

export interface ModalMinimalProps {
  onUpdate?: () => void
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
  navButtonsOptions,
  hiddenButtons,
  small,
  medium,
  big,
}: ModalProps) => {
  if (!isOpen) return null

  return createPortal((
    <div className='fixed backdrop-blur-sm overflow-auto inset-0 z-10 w-full bg-[rgba(0,0,0,0.5)] justify-center items-center flex'>
      <div className={`sm:w-5/6 transform overflow-auto rounded-lg bg-white shadow-xl transition-all sm:my-8 w-100 ${clsx({
        'md:w-3/6': !small,
        'md:w-2/5': medium,
        'md:w-1/3': small,
        'md:w-2/3': big,
      })}`}>
        <div className='px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
          <div className='flex flex-col gap-8'>
            <div className='flex gap-2 items-center'>
              {(iconComponent) && (
                <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200  text-gray-800 sm:mx-0 sm:h-20 sm:w-20'>
                  {iconComponent}
                </div>
              )}

              <div className='w-full'>
                <p className='text-xl uppercase font-bold text-gray-600'>{title}</p>
                {subTitle && <p className='text-sm text-gray-500'>{subTitle}</p>}
              </div>

              <button className='text-2xl hover:bg-gray-100 rounded p-3' onClick={() => setOpen(false)}>
                <MdOutlineClose />
              </button>
            </div>

            <div className={`${containerClassesNames}`}>
              {children}
            </div>
          </div>
        </div>

        {!hiddenButtons && <NavButtons {...navButtonsOptions} />}
      </div>
    </div>
  ), document.body)
}