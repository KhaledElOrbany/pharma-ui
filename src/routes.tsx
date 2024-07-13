import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import DoctorRoutes from './modules/doctor/router/DoctorRouter';

const Dashboard = lazy(() => import('./modules/dashboard/dashboard'));
const Auth = lazy(() => import('./modules/auth/Auth'));
const Oops404 = lazy(() => import('./shared/Oops404'));
const Login = lazy(() => import('./modules/auth/views/Login'));

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Dashboard />} />
      <Route path='auth' element={<Auth />} errorElement={<Oops404 />}>
        <Route index path='login' element={<Login />} />
      </Route>

      {DoctorRoutes}

      <Route path='*' element={<Oops404 />} />
    </Route>
  )
);

export default Router;
