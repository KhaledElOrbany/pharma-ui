import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Dashboard from './modules/dashboard/Dashboard';
import { AuthRoutes } from './modules/auth/Auth';
import { DoctorRoutes } from './modules/doctor/Doctor';

const Oops404 = lazy(() => import('./shared/Oops404'));

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<Dashboard />} />

      {AuthRoutes}
      {DoctorRoutes}

      <Route path='*' element={<Oops404 />} />
    </Route>
  )
);

export default Router;
