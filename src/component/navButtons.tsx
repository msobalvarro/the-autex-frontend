import { NavButtonProps } from '@/interfaces'

export const NavButtons = ({
  renderBack,
  isFinally,
  nextDisabled,
  createText,
  onNextClick,
  onBackClick,
  onSuccess,
  backText
}: NavButtonProps) => {
  return (
    <div className='bg-gray-100 px-4 py-3 sm:flex justify-end sm:px-6 gap-2 mt-6'>
      {renderBack && (
        <button onClick={onBackClick} type='button' className='inline-flex w-full justify-center rounded-md bg-slate-400 px-3 py-2 text-white sm:w-auto'>
          {backText || 'Atrás'}
        </button>
      )}

      {!isFinally && (
        <button onClick={onNextClick} type='button' className='inline-flex w-full justify-center rounded-md bg-slate-400 px-3 py-2 text-white sm:w-auto'>
          Continuar
        </button>
      )}

      {isFinally && (
        <button disabled={nextDisabled} onClick={onSuccess} type='button' className='inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-white sm:w-auto'>
          {createText || 'Cear'}
        </button>
      )}
    </div>
  )
}
