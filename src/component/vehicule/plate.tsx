interface Props {
  plate: string
}

export const VehiculePlate = ({ plate }: Props) => {
  return (
    <div className='rounded px-2 py-1 border bg-gray-100 border-gray-600 text-gray-600 font-bold'>
      {plate}
    </div>
  )
}