import { IoCheckboxSharp } from 'react-icons/io5'
import { MdOutlineIndeterminateCheckBox } from 'react-icons/md'

interface Props {
  label: string
  checked?: boolean
}

export const CheckboxField = ({ label, checked }: Props) => {
  return (
    <div className='flex items-center gap-2 text-gray-700'>
      {checked && <IoCheckboxSharp />}
      {!checked && <MdOutlineIndeterminateCheckBox />}
      <span>{label}</span>
    </div>
  )
}
