import { NavButtonProps } from '@/interfaces'
import clsx from 'clsx'

export const NavButtons = ({
  renderBack,
  isFinally,
  nextDisabled,
  createText,
  onNextClick,
  onBackClick,
  onSuccess,
  backText,
  renderNext
}: NavButtonProps) => (
  <div className='bg-gray-100 px-4 py-3 sm:flex justify-end sm:px-6 gap-2 mt-6'>
    {renderBack && (
      <button onClick={onBackClick} type='button' className='inline-flex w-full justify-center rounded-md bg-slate-400 px-3 py-2 text-white sm:w-auto'>
        {backText || 'Atrás'}
      </button>
    )}

    {(!isFinally && renderNext) && (
      <button
        onClick={onNextClick}
        disabled={nextDisabled}
        type='button'
        className={`inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-white sm:w-auto ${clsx({
          'bg-gray-400': nextDisabled,
          'bg-gray-600': !nextDisabled,
        })}`}>
        Continuar
      </button>
    )}

    {(isFinally || renderNext) && (
      <button
        disabled={nextDisabled}
        onClick={onSuccess}
        type='button'
        className='inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-white sm:w-auto'>
        {createText || 'Guardar'}
      </button>
    )}
  </div>
)
