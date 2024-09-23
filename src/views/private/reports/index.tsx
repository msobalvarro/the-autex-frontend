import { ActionsComponent } from '@/component/ui/actions'
import { LayoutComponent } from '@/component/ui/layout'
import { IncomeReportResponse } from '@/interfaces'
import { Endpoints } from '@/router'
import { axiosInstance } from '@/utils/http'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const ReportView = () => {
  const onChangeFilterRange = async (from: Date, to: Date) => {
    try {
      const response = await axiosInstance.get<IncomeReportResponse>(`${Endpoints.INCOME_REPORT}?from=${from}&to=${to}`)

      console.log(response.data)
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.warning(`${error?.response?.data}`)
      }
    }
  }

  return (
    <div className='flex gap-4 flex-col items-center w-full px-10'>
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
        <p>Reporte</p>
      </LayoutComponent>
    </div>
  )
}
