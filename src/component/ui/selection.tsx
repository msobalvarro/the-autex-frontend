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
  defaultValue,
  value,
}: SelectorComponentProps) => {
  return (
    <Select
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderWidth: 1,
          paddingTop: 6,
          paddingBottom: 6,
          borderColor: state.isFocused ? '#1f2937' : '#e5e7eb',
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
      value={value}
      placeholder={placeholder}
      className={className}
      defaultValue={defaultValue}
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