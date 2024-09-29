import { useState } from 'react'
import { InputField } from '../ui/input'
import clsx from 'clsx'

interface Props {
  onPush: (value: string) => void
  small?: boolean
}

export const InputAddNewActivity = ({ onPush, small }: Props) => {
  const [value, setValue] = useState<string>('')

  const submit = () => {
    onPush(value)
    setValue('')
  }

  return (
    <div className={`flex items-center gap-2 ${clsx({ 'text-sm': small })}`}>
      <InputField
        className='flex-1'
        placeholder='Actividad a realizar'
        value={value}
        onChange={({ currentTarget }) => setValue(currentTarget.value)} />

      <button onClick={submit} className='py-3 px-4 rounded-lg bg-gray-600 text-white'>Agregar</button>
    </div>
  )
}