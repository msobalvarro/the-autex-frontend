import Select, { SingleValue } from 'react-select'
import { SelectionProps, SelectorComponentProps } from '@/interfaces'

export const CustomSelectOption = ({
  data,
  isClearable,
  isDisabled,
  isLoading,
  isRtl,
  isSearchable,
  className,
  placeholder,
  onChange,
}: SelectorComponentProps) => {
  return (
    <Select
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderWidth: 1.5,
          borderColor: state.isFocused ? '#1f2937' : '#CCC',
          boxShadow: 'none',
          borderRadius: 5,
        }),
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: '#CCC',
          primary: '#1f2937',
        },
      })}
      placeholder={placeholder}
      className={className}
      defaultValue={data[0] || null}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isClearable={isClearable}
      isRtl={isRtl}
      isSearchable={isSearchable}
      onChange={(data: SingleValue<SelectionProps>) => onChange?.(data)}
      options={data}
    />
  )
}