interface AuxProps {
  children: React.ReactNode
}

export const LayoutComponent = (props: AuxProps) => {
  return (
    <main className='bg-gray-100 mx-auto mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 mt-8 flex-1 p-8 shadow flex flex-col gap-8'>
      {props.children}
    </main>
  )
}