import { Routes, Route } from 'react-router-dom'
import { NavbarComponent } from '../component/ui/navbar'
import { routes } from '../router'
import { NotFoundView } from './public/notFound'
import { EstimateServiceView } from './private/estimate'
import { VehiculesView } from './private/vehicules'
import { ClientView } from './private/clients'
import { LoginView } from './public/login'
import { useAuth } from '@/hooks/auth'
import { WelcomeScreen } from './private/welcome'
import { DetailEstimateView } from './private/estimate/detail'
import { OrderServiceView } from './private/order'
import { OrderDetailView } from './private/order/detail'
import { WorkshopsView } from './private/workshops'
import { DetailClientView } from './private/clients/detail'

export const App = () => {
  const { auth } = useAuth()
  return (
    <>
      {auth?.token && <NavbarComponent />}
      <main className='flex flex-col flex-1 items-center'>
        <Routes>
          <Route path={routes.MAIN}>
            {auth?.token && (<>
              <Route path={routes.MAIN} element={<WelcomeScreen />} />
              <Route path={routes.ESTIMATE_SERVICE} element={<EstimateServiceView />} />
              <Route path={routes.VEHICULES} element={<VehiculesView />} />
              <Route path={routes.CLIENTS} element={<ClientView />} />
              <Route path={routes.CLIENT_DETAIL} element={<DetailClientView />} />
              <Route path={routes.ESTIMATE_DETAIL} element={<DetailEstimateView />} />
              <Route path={routes.ORDER_SERVICE} element={<OrderServiceView />} />
              <Route path={routes.ORDER_DETAIL} element={<OrderDetailView />} />
              <Route path={routes.WORKSHOPS} element={<WorkshopsView />} />
            </>)}

            {!auth?.token && <Route path={routes.MAIN} element={<LoginView />} />}
            <Route path='*' element={<NotFoundView />} />
          </Route>
        </Routes>
      </main>
    </>
  )
}