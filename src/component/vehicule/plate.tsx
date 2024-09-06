interface Props {
  plate: string
}

export const VehiculePlate = ({ plate }: Props) => {
  return (
    <div className='rounded px-2 py-1 border bg-gray-200 border-gray-400 text-gray-400 font-bold'>
      {plate}
    </div>
  )
}