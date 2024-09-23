import { ActionsComponentProps } from '@/interfaces';
import { InputSearch } from '@/component/ui/input';
import { RangePickerReport } from '../report/rangePicker';

export const ActionsComponent = ({
  title,
  subtitle,
  onClickButton,
  textButton,
  onChangeFilterValue,
  secondaryButtons,
  hiddeButton,
  searchTextPlaceholder,
  showRangePicker,
  onChangeRangePicker,
  hiddeSearch,
}: ActionsComponentProps) => {
  return (
    <div className='flex flex-row flex-1 items-center'>
      <div className='flex flex-col flex-1 gap-1'>
        <p className='text-4xl text-gray-700'>{title}</p>
        <p className='text-md text-gray-500 font-[300]'>{subtitle}</p>

        {secondaryButtons && (
          <div className='flex gap-4'>
            {secondaryButtons.map(secondaryButton => (
              <button className='p-2 rounded text-cyan-800 hover:bg-gray-200 transition' key={crypto.randomUUID()} onClick={secondaryButton.onClick}>
                {secondaryButton.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className='flex flex-row gap-4'>
        {!hiddeSearch && (
          <InputSearch
            placeholder={searchTextPlaceholder || 'buscar'}
            onChange={({ currentTarget }) => onChangeFilterValue?.(currentTarget.value)} />
        )}

        {(showRangePicker && onChangeRangePicker) && <RangePickerReport onChange={onChangeRangePicker} />}

        {!hiddeButton && (
          <button className='py-3 px-6 outline-none bg-gray-700 text-white rounded-lg' onClick={onClickButton}>
            {textButton}
          </button>
        )}
      </div>
    </div>
  )
}