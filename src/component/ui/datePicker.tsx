import { DateValue, getLocalTimeZone, now } from '@internationalized/date'
import { DatePicker } from '@nextui-org/date-picker'

interface Props {
  value: DateValue | null
  onChange: (value: DateValue) => void
}

export const UiDatePicker = ({ value, onChange }: Props) => {
  return (
    <DatePicker
      value={value}
      onChange={onChange}
      dateInputClassNames={{
        base: 'max-w-[284px] border rounded px-2 py-1 border-gray-200',
        inputWrapper: 'shadow-none bg-transparent hover:bg-transparent focus:bg-transparent'
      }}
    />
  )
}