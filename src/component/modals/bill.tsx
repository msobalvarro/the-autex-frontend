import html2pdf from 'html2pdf.js'
import { CustomModal, ModalMinimalProps } from './layout'
import { useRef } from 'react'

export const BillPreview = ({ setOpen }: ModalMinimalProps) => {
  const inputRef = useRef(null)

  const download = () => {
    html2pdf().from(inputRef.current).save()
  }

  return (
    <CustomModal
      big
      title='Factura'
      navButtonsOptions={{
        createText: 'Descargar',
        isFinally: true,
        renderBack: false,
        onSuccess: download
      }}
      containerClassesNames='gap-4 flex flex-col'
      isOpen
      setOpen={setOpen}>
      <div className='bg-white p-8 shadow-md rounded-md' ref={inputRef}>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h1 className='text-2xl font-bold'>Acme Corporation</h1>
            <p className='text-muted-foreground'>123 Main St, Anytown USA</p>
            <p className='text-muted-foreground'>info@acme.com | (123) 456-7890</p>
          </div>
          <div className='text-right'>
            <p className='text-muted-foreground'>Fecha de emisión: 28 de agosto de 2024</p>
            <p className='text-muted-foreground'>Factura #: 12345</p>
          </div>
        </div>
        <div className='mb-6'>
          <h2 className='text-lg font-medium mb-2'>Datos del cliente</h2>
          <p className='text-muted-foreground'>Liam Johnson</p>
          <p className='text-muted-foreground'>1234 Main St, Anytown USA</p>
          <p className='text-muted-foreground'>liam@example.com</p>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-muted'>
                <th className='px-4 py-2 text-left'>Descripción</th>
                <th className='px-4 py-2 text-right'>Cantidad</th>
                <th className='px-4 py-2 text-right'>Precio unitario</th>
                <th className='px-4 py-2 text-right'>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border-b px-4 py-2'>Glimmer Lamps</td>
                <td className='border-b px-4 py-2 text-right'>2</td>
                <td className='border-b px-4 py-2 text-right'>$125.00</td>
                <td className='border-b px-4 py-2 text-right'>$250.00</td>
              </tr>
              <tr>
                <td className='border-b px-4 py-2'>Aqua Filters</td>
                <td className='border-b px-4 py-2 text-right'>1</td>
                <td className='border-b px-4 py-2 text-right'>$49.00</td>
                <td className='border-b px-4 py-2 text-right'>$49.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='mt-6 text-right'>
          <div className='grid grid-cols-2 gap-2'>
            <p className='text-muted-foreground'>Subtotal:</p>
            <p>$299.00</p>
            <p className='text-muted-foreground'>Impuestos:</p>
            <p>$25.00</p>
            <p className='font-medium'>Total a pagar:</p>
            <p className='font-medium'>$324.00</p>
          </div>
        </div>
        <div className='mt-6 text-sm text-muted-foreground'>
          <p>Términos y condiciones de pago:</p>
          <p>Pago neto a 30 días. Se aplicarán intereses por mora en caso de pago atrasado.</p>
        </div>
      </div>
    </CustomModal>
  )
}
