import html2pdf from 'html2pdf.js'
import { CustomModal, ModalMinimalProps } from './layout'
import { useRef } from 'react'
import { useAxios } from '@/hooks/fetch'
import { Endpoints } from '@/router'
import { Loader } from '../loader'
import { ActivityWithCostToDoItemEstimate, OrderServicePropierties } from '@/interfaces'
import dayjs from 'dayjs'
import { formatNumber } from '@/utils/formatNumber'
import _ from 'lodash'

interface Props extends ModalMinimalProps {
  orderId: string
}

export const BillOrderPreview = ({ setOpen, orderId }: Props) => {
  const inputRef = useRef(null)
  const { data, loading } = useAxios({
    endpoint: Endpoints.GET_ORDER_DETAIL_SERVICE + orderId
  })
  const customData: OrderServicePropierties = data ? data : {}

  console.log(customData)

  const download = () => {
    html2pdf().from(inputRef.current).save()
  }

  if (loading) {
    return <Loader active />
  }

  const sums = {
    ACTIVITY: _.sumBy(customData.estimateProps?.activitiesToDo, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)),
    PARTS: _.sumBy(customData.estimateProps?.requiredParts, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)),
    EXTERNAL: _.sumBy(customData.estimateProps?.otherRequirements, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)),
    OTHER: _.sumBy(customData.estimateProps?.otherRequirements, (e: ActivityWithCostToDoItemEstimate) => Number(e.total)),
  }

  return (
    <CustomModal
      big
      title='Factura'
      navButtonsOptions={{
        createText: 'Descargar factura',
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
            <h1 className='text-2xl font-bold'>Nombre Compañía</h1>
            <p className='text-muted-foreground'>Managua, Nic.</p>
            <p className='text-muted-foreground'>info@example.com | (505) 8456-7890</p>
          </div>
          <div className='text-right'>
            <p className='text-muted-foreground'>Fecha de emisión: {dayjs(customData.createdAt).format('dddd, MMMM D, YYYY h:mm A	')}</p>
            <code className='text-muted-foreground'>{customData._id}</code>
          </div>
        </div>

        <div className='mb-6'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
              <h2 className='text-lg font-medium mb-2'>Datos del cliente</h2>
              <p className='text-muted-foreground'>{customData.estimateProps?.client?.name}</p>
              <p className='text-muted-foreground'>{customData.estimateProps?.client?.phoneNumber}</p>
              <p className='text-muted-foreground'>{customData.estimateProps?.client?.email}</p>
            </div>
            <div className='flex flex-col text-right'>
              <h2 className='text-lg font-medium mb-2'>Datos del Vehiculo</h2>
              <p className='text-muted-foreground'>
                {`
                  ${customData.estimateProps?.vehicule?.brand?.description} 
                  ${customData.estimateProps?.vehicule?.model?.description}
                `}
              </p>
              <p className='text-muted-foreground'>{customData.estimateProps?.vehicule?.plate}</p>
              <p className='text-muted-foreground'>Color {customData.estimateProps?.vehicule?.color}</p>
              <p className='text-muted-foreground'>KM / Millas Actual {customData.traveled?.distance.toLocaleString()}</p>
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
              {customData.estimateProps?.activitiesToDo && customData.estimateProps?.activitiesToDo?.map(act => (
                <tr key={crypto.randomUUID()}>
                  <td className='border-b px-4 py-2'>{act.description}</td>
                  <td className='border-b px-4 py-2 text-right'>{act.quantity}</td>
                  <td className='border-b px-4 py-2 text-right'>{formatNumber(Number(act.unitCost))}</td>
                  <td className='border-b px-4 py-2 text-right'>{formatNumber(Number(act?.total))}</td>
                </tr>
              ))}
              {customData.estimateProps?.requiredParts?.map(act => (
                <tr key={crypto.randomUUID()}>
                  <td className='border-b px-4 py-2'>{act.description}</td>
                  <td className='border-b px-4 py-2 text-right'>{act.quantity}</td>
                  <td className='border-b px-4 py-2 text-right'>{formatNumber(Number(act.unitCost))}</td>
                  <td className='border-b px-4 py-2 text-right'>{formatNumber(Number(act?.total))}</td>
                </tr>
              ))}
              {customData.estimateProps?.otherRequirements?.map(act => (
                <tr key={crypto.randomUUID()}>
                  <td className='border-b px-4 py-2'>{act.description}</td>
                  <td className='border-b px-4 py-2 text-right'>{act.quantity}</td>
                  <td className='border-b px-4 py-2 text-right'>{formatNumber(Number(act.unitCost))}</td>
                  <td className='border-b px-4 py-2 text-right'>{formatNumber(Number(act?.total))}</td>
                </tr>
              ))}
              {customData.estimateProps?.externalActivities?.map(act => (
                <tr key={crypto.randomUUID()}>
                  <td className='border-b px-4 py-2'>{act.description}</td>
                  <td className='border-b px-4 py-2 text-right'>{act.quantity}</td>
                  <td className='border-b px-4 py-2 text-right'>{formatNumber(Number(act.unitCost))}</td>
                  <td className='border-b px-4 py-2 text-right'>{formatNumber(Number(act?.total))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='mt-6 flex items-end flex-col justify-end'>
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
            <p className='text-muted-foreground'>Total</p>
            <p>{formatNumber(_.sum(Object.values(sums)))}</p>
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
