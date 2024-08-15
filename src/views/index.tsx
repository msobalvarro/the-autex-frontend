import { Routes, Route } from 'react-router-dom'
import { NavbarComponent } from '../component/navbar'
import { routes } from '../router'
import { NotFoundView } from './public/notFound'
import { EstimateServiceView } from './private/estimate'

export const App = () => {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path={routes.ESTIMATE_SERVICE}>
          <Route path={routes.ESTIMATE_SERVICE} element={<EstimateServiceView />} />
          <Route path='*' element={<NotFoundView />} />
        </Route>
      </Routes>
    </>
  )
}