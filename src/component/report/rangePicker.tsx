import { useState } from 'react'
import { UiDatePicker } from '../ui/datePicker'
import { DateValue, getLocalTimeZone } from '@internationalized/date'

interface Props {
  onChange: (from: Date, to: Date) => void
}

export const RangePickerReport = ({ onChange }: Props) => {
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
  }

  return (
    <div className='flex items-center gap-4'>
      <UiDatePicker label='Desde' value={starDate} onChange={setStartDate} />
      <UiDatePicker label='Hasta' value={endDate} onChange={setEndDate} />

      <button className='p-2 bg-gray-700 text-white rounded' onClick={apply}>Aplicar</button>
    </div>
  )
}