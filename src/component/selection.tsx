import Select from 'react-select'
import { SelectorComponentProps } from '@/interfaces'


export const CustomSelectOption = ({
  data,
  isClearable,
  isDisabled,
  isLoading,
  isRtl,
  isSearchable
}: SelectorComponentProps) => {
  if (!data) return null

  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={data[0]}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="color"
        options={data}
      />
    </>
  )
}