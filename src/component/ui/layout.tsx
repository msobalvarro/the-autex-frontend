import { BackButton } from './back'

interface AuxProps {
  children: React.ReactNode
  renderBack?: boolean
}

export const LayoutComponent = ({ children, renderBack }: AuxProps) => {
  return (
    <div className={`w-full flex items-center flex-col gap-4 relative`}>

      <div className='lg:w-4/5 sm:w-full flex flex-col'>
        {renderBack && (
          <BackButton />
        )}

        <div className='bg-white rounded-md p-8 shadow flex flex-col gap-8 flex-1'>
        {children}
        </div>
      </div>
    </div>
  )
}