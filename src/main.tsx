import '@/styles/index.scss'
import 'react-toastify/dist/ReactToastify.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from '@/views'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>

    <ToastContainer hideProgressBar  />
  </StrictMode>
)
