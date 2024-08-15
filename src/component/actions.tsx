import { ActionsComponentProps } from '@/interfaces';

export const ActionsComponent = ({ title, subtitle, onClickButton, textButton }: ActionsComponentProps) => {
  return (
    <div className='flex flex-row flex-1 items-center'>
      <div className='flex flex-col flex-1'>
        <p className='text-2xl'>{title}</p>
        <p className='text-l'>{subtitle}</p>
      </div>

      <div className='flex flex-row'>
        <input placeholder='search' />
        <button onClick={onClickButton}>{textButton}</button>
      </div>
    </div>
  )
}