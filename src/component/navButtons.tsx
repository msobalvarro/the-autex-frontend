import { NavButtonProps } from '@/interfaces'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
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
  renderNext,
  renderConfirmDelete,
  deleteText,
  onDelete,
}: NavButtonProps) => (
  <div className='bg-gray-100 px-4 py-3 sm:flex justify-end sm:px-6 gap-2'>
    {renderBack && (
      <button onClick={onBackClick} type='button' className='w-full flex items-center gap-2 rounded-md bg-slate-600 px-3 py-2 text-white sm:w-auto'>
        <FaArrowLeft /> <span>{backText || 'Atrás'}</span>
      </button>
    )}

    {(!isFinally && renderNext) && (
      <button
        onClick={onNextClick}
        disabled={nextDisabled}
        type='button'
        className={`w-full disabled:bg-gray-300 flex items-center gap-2 rounded-md bg-gray-600 px-3 py-2 text-white sm:w-auto ${clsx({
          'bg-gray-300': nextDisabled,
          'bg-gray-600': !nextDisabled,
        })}`}>
        <span>Continuar</span> <FaArrowRight />
      </button>
    )}

    {(isFinally) && (
      <button
        disabled={nextDisabled}
        onClick={onSuccess}
        type='button'
        className='w-full justify-center flex items-center gap-2 rounded-md bg-gray-600 px-3 py-2 text-white sm:w-auto'>
        <span>{createText || 'Guardar'}</span>
      </button>
    )}

    {(renderConfirmDelete) && (
      <button
        disabled={nextDisabled}
        onClick={onDelete}
        type='button'
        className='w-full justify-center flex items-center gap-2 rounded-md bg-red-800 px-3 py-2 text-white sm:w-auto'>
        <span>{deleteText || 'Eliminar'}</span>
      </button>
    )}
  </div>
)
