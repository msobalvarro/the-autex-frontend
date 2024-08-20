import { Routes, Route } from 'react-router-dom'
import { NavbarComponent } from '../component/navbar'
import { routes } from '../router'
import { NotFoundView } from './public/notFound'
import { EstimateServiceView } from './private/estimate'
import { VehiculesView } from './private/vehicules'
import { ClientView } from './private/clients'
import { LoginView } from './public/login'

export const App = () => {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route>LoginView
          <Route path={routes.ESTIMATE_SERVICE} element={<EstimateServiceView />} />
          <Route path={routes.VEHICULES} element={<VehiculesView />} />
          <Route path={routes.CLIENTS} element={<ClientView />} />
          <Route path={routes.LOGIN} element={<LoginView />} />
          <Route path='*' element={<NotFoundView />} />
        </Route>
      </Routes>
    </>
  )
}