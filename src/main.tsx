import '@/styles/index.scss'
import 'react-toastify/dist/ReactToastify.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from '@/views'
import { ToastContainer } from 'react-toastify'
import dayjs from 'dayjs'
import tz from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import updateLocale from 'dayjs/plugin/updateLocale'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/es-mx'

dayjs.extend(tz)
dayjs.extend(utc)
dayjs.extend(updateLocale)
dayjs.extend(localizedFormat)
dayjs.locale('es-mx')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>

    <ToastContainer hideProgressBar  />
  </StrictMode>
)
