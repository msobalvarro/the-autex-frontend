interface Props {
  checked: boolean
  onChange: () => void
  disabled?: boolean
}
export const UiCheckbox = ({ checked, onChange, disabled }: Props) => (
  <input
    className='accent-pink-500 h-5 w-5 disabled:bg-gray-500'
    checked={checked}
    disabled={disabled}
    onChange={() => onChange()}
    type='checkbox' />
)