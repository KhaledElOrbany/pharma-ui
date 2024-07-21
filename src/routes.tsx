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

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' errorElement={<CustomErrors />}>
      <Route index element={<Dashboard />} />

      <Route path='login' element={<Auth />} errorElement={<CustomErrors />}>
        <Route index element={<LoginPage />} />
      </Route>

      <Route path='doctor' element={<Doctor />} errorElement={<CustomErrors />}>
        <Route index element={<DoctorsList />} />
        <Route path=':id' element={<DoctorProfile />} />
      </Route>

      <Route path='*' element={<Oops404 />} />
    </Route>
  )
);

export default Router;
