import { DateValue } from '@internationalized/date'
import { DatePicker } from '@nextui-org/date-picker'
import clsx from 'clsx'

interface Props {
  value: DateValue | null
  onChange: (value: DateValue) => void
  label?: string
  hiddenBordered?: boolean
}

export const UiDatePicker = ({ value, onChange, label, hiddenBordered }: Props) => {
  return (
    <DatePicker
      value={value}
      label={label}
      calendarWidth={300}
      onChange={onChange}
      showMonthAndYearPickers
      dateInputClassNames={{
        base: `max-w-[284px] border ${clsx({ 'border-0': hiddenBordered })} rounded px-2 py-1 border-gray-200`,
        inputWrapper: 'shadow-none bg-transparent hover:bg-transparent focus:bg-transparent'
      }}
    />
  )
}