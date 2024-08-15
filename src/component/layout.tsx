interface AuxProps {
  children: React.ReactNode
}

export const LayoutComponent = (props: AuxProps) => {
  return (
    <main className='container mx-auto flex-grow mt-8'>{props.children}</main>
  )
}