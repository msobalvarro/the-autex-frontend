import { ActionsComponentProps } from '@/interfaces';
import { InputSearch } from '@/component/input';

export const ActionsComponent = ({ title, subtitle, onClickButton, textButton }: ActionsComponentProps) => {
  return (
    <div className='flex flex-row flex-1 items-center'>
      <div className='flex flex-col flex-1'>
        <p className='text-2xl'>{title}</p>
        <p className='text-md text-gray-500 font-[300]'>{subtitle}</p>
      </div>

      <div className='flex flex-row gap-4'>
        <InputSearch placeholder='search' />
        <button className='py-3 px-6 outline-none bg-gray-800 text-white rounded-lg' onClick={onClickButton}>{textButton}</button>
      </div>
    </div>
  )
}