import { useState } from 'react'
import { UiDatePicker } from '../ui/datePicker'
import { DateValue, getLocalTimeZone } from '@internationalized/date'
import { FaTrashAlt } from 'react-icons/fa'

interface Props {
  onChange: (from: Date, to: Date) => void
  onClearFilter?: () => void
}

export const RangePickerReport = ({ onChange, onClearFilter }: Props) => {
  const [starDate, setStartDate] = useState<DateValue | null>(null)
  const [endDate, setEndDate] = useState<DateValue | null>(null)

  const apply = () => {
    if (starDate && endDate) {
      onChange(
        starDate?.toDate(getLocalTimeZone()),
        endDate?.toDate(getLocalTimeZone())
      )
    }
  }

  const clear = () => {
    setStartDate(null)
    setEndDate(null)
    onClearFilter?.()
  }

  return (
    <div className='flex items-center gap-4 p-4 border border-gray-200 bg-gray-50 rounded-md'>
      {Boolean(onClearFilter) && (
        <button onClick={clear} className='p-4 text-gray-500 rounded-full hover:bg-gray-200 transition'>
          <FaTrashAlt />
        </button>
      )}

      <UiDatePicker hiddenBordered label='Desde' value={starDate} onChange={setStartDate} />
      <UiDatePicker label='Hasta' hiddenBordered value={endDate} onChange={setEndDate} />

      <button className='p-2 bg-gray-700 text-white rounded' onClick={apply}>Aplicar</button>
    </div>
  )
}