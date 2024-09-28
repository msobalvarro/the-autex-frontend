import _ from 'lodash'
import dayjs from 'dayjs'
import { RowDetailItem } from '@/component/report/itemReportTable'
import { ActionsComponent } from '@/component/ui/actions'
import { LayoutComponent } from '@/component/ui/layout'
import { Loader } from '@/component/ui/loader'
import { IncomeReportResponse } from '@/interfaces'
import { Endpoints } from '@/router'
import { axiosInstance } from '@/utils/http'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'


export const IncomeReport = () => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [report, setReport] = useState<IncomeReportResponse | null>(null)

  const onChangeFilterRange = async (from: Date, to: Date) => {
    setLoading(true)
    try {
      const fromFormat = dayjs(from).format('MM-DD-YYYY')
      const toFormat = dayjs(to).format('MM-DD-YYYY')

      const response = await axiosInstance.get<IncomeReportResponse>(`${Endpoints.INCOME_REPORT}?from=${fromFormat}&to=${toFormat}`)
      setReport(response.data)
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.warning(`${error?.response?.data}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <LayoutComponent>
      <ActionsComponent
        hiddeButton
        hiddeSearch
        showRangePicker
        onChangeRangePicker={onChangeFilterRange}
        textButton='Nueva Orden'
        title='Reporte de Ingresos'
        subtitle='Visualiza y gestiona todos los reportes de ingreso con rango de fechas'
        searchTextPlaceholder='Buscar orden, vehiculo..' />
      {report && (
        <div className='flex gap-4 flex-col text-gray-700'>
          <div className='flex items p-8 center justify-between'>
            <RowDetailItem label='Total Mano de obra' price={report.totalLaborCost} />
            <RowDetailItem label='Partes / Repuestos' price={report.totalPartsCost} />
          </div>

          <div className='flex items p-8 center justify-between border-t-1 border-b-1'>
            <RowDetailItem label='Otros Requeriemientos' price={report.totalInputCost} />
            <RowDetailItem label='Actividades externas' price={report.totalExternalCost} />
          </div>

          <div className='flex p-8 items-center justify-between border-b-1'>
            <RowDetailItem label='Otros Servicios' price={report.totalOtherServices} />
            <RowDetailItem label='Taxes' price={report.totalTaxes} />
          </div>

          <div className='flex p-8 items-center justify-end border-b-1'>
            <RowDetailItem label='Total' price={_.sum(Object.values(report))} />
          </div>
        </div>
      )}

      {!report && (
        <p className='text-2xl text-gray-400 p-4 text-center'>Selecciona un rango de fechas</p>
      )}

      <Loader active={isLoading} />
    </LayoutComponent>
  )
}