// @ts-ignore
import html2pdf from 'html2pdf.js'
import _ from 'lodash'
import dayjs from 'dayjs'
import { CustomModal, ModalMinimalProps } from './layout'
import { useRef } from 'react'
import { useAxios } from '@/hooks/fetch'
import { Endpoints } from '@/router'
import { Loader } from '../ui/loader'
import { ActivityWithCostToDoItemEstimate, BillPropsResponse } from '@/interfaces'
import { formatNumber } from '@/utils/formatNumber'
import { useAuth } from '@/hooks/auth'
import { v4 } from 'uuid'

interface Props extends ModalMinimalProps {
  orderId: string
}

export const BillOrderPreview = ({ setOpen, orderId }: Props) => {
  const { auth } = useAuth()
  const { data, loading, error } = useAxios({ endpoint: Endpoints.GET_BILL_BY_ORDER_ID + orderId })
  const bill: BillPropsResponse = data ? data : { order: { status: 'pending' } }
  const inputRef = useRef(null)

  const download = () => {
    html2pdf().from(inputRef.current).save()
  }

  const openNewTabAndPrint = () => {
    html2pdf().from(inputRef.current).toPdf().get('pdf').then(function (pdf: any) {
      window.open(pdf.output('bloburl'), '_blank')?.print()
    })
  }

  if (loading) {
    return <Loader active />
  }

  const sums = {
    ACTIVITY: _.sumBy(bill.order.estimateProps?.activitiesToDo || [], (e: ActivityWithCostToDoItemEstimate) => Number(e.total)),
    PARTS: _.sumBy(bill.order.estimateProps?.requiredParts, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)),
    EXTERNAL: _.sumBy(bill.order.estimateProps?.otherRequirements, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)),
    OTHER: _.sumBy(bill.order.estimateProps?.otherRequirements, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)),
    ADITIONAL: _.sumBy(bill.order.additionalTask, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)),
  }

  return (
    <CustomModal
      big
      title='Factura'
      subTitle='Puedes descargar la factura e imprimirla sin descargarla'
      navButtonsOptions={{
        createText: 'Descargar factura',
        backText: 'Imprimir',
        onBackClick: openNewTabAndPrint,
        isFinally: true,
        renderBack: true,
        onSuccess: download
      }}
      containerClassesNames='gap-4 flex flex-col'
      isOpen
      setOpen={setOpen}>
      <>
        {error && <p className='text-xl text-rose-500'>{error}</p>}

        {data && (
          <div className='bg-white p-8 shadow-md rounded-md' ref={inputRef}>
            <div className='flex justify-between items-start mb-6'>
              <div>
                <h1 className='text-2xl font-bold'>{auth?.workshop?.name}</h1>
                <p className='text-sm font-bold'>RUC {auth?.workshop?.ruc}</p>
                <p className='text-muted-foreground'>{auth?.workshop?.location}</p>
                <p className='text-muted-foreground'>{auth?.workshop?.phoneNumber}</p>
              </div>
              <div className='text-right'>
                <p className='text-muted-foreground'>{dayjs(bill.createdAt).format('dddd, MMMM D, YYYY h:mm A	')}</p>
                <code className='text-muted-foreground font-bold'>{bill._id}</code>
              </div>
            </div>

            <div className='mb-6'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col'>
                  <h2 className='text-lg font-medium mb-2'>Datos del cliente</h2>
                  <p className='text-muted-foreground'>{bill.order.estimateProps?.client?.name}</p>
                  <p className='text-muted-foreground'>{bill.order.estimateProps?.client?.phoneNumber}</p>
                  <p className='text-muted-foreground'>{bill.order.estimateProps?.client?.email}</p>
                </div>
                <div className='flex flex-col text-right'>
                  <h2 className='text-lg font-medium mb-2'>Datos del Vehiculo</h2>
                  <p className='text-muted-foreground'>
                    {`
                  ${bill.order.estimateProps?.vehicule?.brand?.description} 
                  ${bill.order.estimateProps?.vehicule?.model?.description}
                `}
                  </p>
                  <p className='text-muted-foreground'>{bill.order.estimateProps?.vehicule?.plate}</p>
                  <p className='text-muted-foreground'>Color {bill.order.estimateProps?.vehicule?.color}</p>
                  <p className='text-muted-foreground'>KM / Millas Actual {bill.order.traveled?.distance?.toLocaleString()}</p>
                </div>
              </div>
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
                  {bill.order.estimateProps?.activitiesToDo && bill.order.estimateProps?.activitiesToDo?.map(act => (
                    <tr key={v4()}>
                      <td className='border-b px-4 py-2'>{act.description}</td>
                      <td className='border-b px-4 py-2 text-right'>{act.quantity}</td>
                      <td className='border-b px-4 py-2 text-right'>{formatNumber(Number(act.unitCost))}</td>
                      <td className='border-b px-4 py-2 text-right'>{formatNumber(Number(act?.total))}</td>
                    </tr>
                  ))}
                  {bill.order.estimateProps?.requiredParts?.map(act => (
                    <tr key={v4()}>
                      <td className='border-b px-4 py-2'>{act.description}</td>
                      <td className='border-b px-4 py-2 text-right'>{act.quantity}</td>
                      <td className='border-b px-4 py-2 text-right'>{formatNumber(Number(act.unitCost))}</td>
                      <td className='border-b px-4 py-2 text-right'>{formatNumber(Number(act?.total))}</td>
                    </tr>
                  ))}
                  {bill.order.estimateProps?.otherRequirements?.map(act => (
                    <tr key={v4()}>
                      <td className='border-b px-4 py-2'>{act.description}</td>
                      <td className='border-b px-4 py-2 text-right'>{act.quantity}</td>
                      <td className='border-b px-4 py-2 text-right'>{formatNumber(Number(act.unitCost))}</td>
                      <td className='border-b px-4 py-2 text-right'>{formatNumber(Number(act?.total))}</td>
                    </tr>
                  ))}
                  {bill.order.estimateProps?.externalActivities?.map(act => (
                    <tr key={v4()}>
                      <td className='border-b px-4 py-2'>{act.description}</td>
                      <td className='border-b px-4 py-2 text-right'>{act.quantity}</td>
                      <td className='border-b px-4 py-2 text-right'>{formatNumber(Number(act.unitCost))}</td>
                      <td className='border-b px-4 py-2 text-right'>{formatNumber(Number(act?.total))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='mt-6 flex items-end flex-col justify-end mr-4'>
              <div className='flex gap-8'>
                <p className='text-muted-foreground'>Mano de Obra</p>
                <p>{formatNumber(sums.ACTIVITY)}</p>
              </div>

              <div className='flex gap-8'>
                <p className='text-muted-foreground'>Repuestos</p>
                <p>{formatNumber(sums.PARTS)}</p>
              </div>

              <div className='flex gap-8'>
                <p className='text-muted-foreground'>Insumos</p>
                <p>{formatNumber(sums.OTHER)}</p>
              </div>

              <div className='flex gap-8'>
                <p className='text-muted-foreground'>Mano de obra externa</p>
                <p>{formatNumber(sums.EXTERNAL)}</p>
              </div>
              <div className='flex gap-8'>
                <p className='text-muted-foreground'>Actividades Adicionales</p>
                <p>{formatNumber(sums.ADITIONAL)}</p>
              </div>

              {Boolean(bill?.tax) && (
                <div className='flex gap-8 font-bold'>
                  <p className='text-muted-foreground'>Impuesto</p>
                  <p>{formatNumber(bill?.tax || 0)}</p>
                </div>
              )}

              <div className='flex gap-8 font-bold'>
                <p className='text-muted-foreground'>Total</p>
                <p>{formatNumber(bill?.total || 0)}</p>
              </div>
            </div>
          </div>
        )}
      </>
    </CustomModal>
  )
}
