import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import AuthRoutes from './modules/auth/router/AuthRoutes';
import DoctorRoutes from './modules/doctor/router/DoctorRoutes';

const Dashboard = lazy(() => import('./modules/dashboard/dashboard'));
const Oops404 = lazy(() => import('./shared/Oops404'));

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Dashboard />} />

      {AuthRoutes}
      {DoctorRoutes}

      <Route path='*' element={<Oops404 />} />
    </Route>
  )
);

export default Router;
