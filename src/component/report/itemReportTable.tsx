import { formatNumber } from '@/utils/formatNumber'

interface PropsRow {
  label: string,
  price: number
}

export const RowDetailItem = ({ label, price }: PropsRow) => {
  return (
    <div className='flex text-lg items-center gap-2'>
      <p>{label}</p>
      <b>{formatNumber(price)}</b>
    </div>
  )
}

