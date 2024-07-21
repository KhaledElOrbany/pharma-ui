import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Dashboard from './modules/dashboard/Dashboard';
import Auth from './modules/auth/Auth';
import Doctor from './modules/doctor/Doctor';
import DoctorsList from './modules/doctor/pages/DoctorsList';
import DoctorProfile from './modules/doctor/pages/DoctorProfile';

const Oops404 = lazy(() => import('./shared/pages/Oops404'));
const LoginPage = lazy(() => import('./modules/auth/views/Login'));
const CustomErrors = lazy(() => import('./shared/pages/CustomErrors'));
const PrivateRoute = lazy(() => import('./helpers/components/PrivateRoute'));

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' errorElement={<CustomErrors />}>
      <Route element={<PrivateRoute />}>
        <Route path='/' element={<Dashboard />} />

        <Route path='doctor' element={<Doctor />}>
          <Route index element={<DoctorsList />} />
          <Route path=':id' element={<DoctorProfile />} />
        </Route>

        <Route path='*' element={<Oops404 />} />
      </Route>

      <Route element={<Auth />}>
        <Route path='login' element={<LoginPage />} />
      </Route>
    </Route>
  )
);

export default Router;
