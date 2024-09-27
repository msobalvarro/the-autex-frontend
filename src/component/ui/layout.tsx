import { BackButton } from './back'

interface AuxProps {
  children: React.ReactNode
  renderBack?: boolean
}

export const LayoutComponent = ({ children, renderBack }: AuxProps) => {
  return (
    <div className={`w-full flex items-center flex-col gap-4 relative`}>
      {renderBack && (
        <BackButton />
      )}

      <div className='bg-white rounded-md p-8 lg:w-4/5 sm:w-full shadow flex flex-col gap-8'>
        {children}
      </div>
    </div>
  )
}