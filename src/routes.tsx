import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

const Doctor = lazy(() => import('./modules/doctor/doctor'));
const Dashboard = lazy(() => import('./modules/dashboard/dashboard'));
const Auth = lazy(() => import('./modules/auth/Auth'));
const Oops404 = lazy(() => import('./shared/Oops404'));
const Login = lazy(() => import('./modules/auth/views/Login'));
const DoctorsList = lazy(
  () => import('./modules/doctor/components/DoctorsList')
);
const DoctorProfile = lazy(
  () => import('./modules/doctor/components/DoctorProfile')
);

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Dashboard />} />
      <Route path='auth' element={<Auth />} errorElement={<Oops404 />}>
        <Route index path='login' element={<Login />} />
      </Route>
      <Route path='doctor' element={<Doctor />} errorElement={<Oops404 />}>
        <Route index element={<DoctorsList />} />
        <Route path=':id' element={<DoctorProfile />} />
      </Route>
    </Route>
  )
);

export default Router;
