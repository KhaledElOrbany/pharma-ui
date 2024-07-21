import { lazy, Suspense } from 'react';
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
import { Loader } from './shared/components/loader';

const Oops404 = lazy(() => import('./shared/pages/Oops404'));
const LoginPage = lazy(() => import('./modules/auth/views/Login'));
const CustomErrors = lazy(() => import('./shared/pages/CustomErrors'));
const PrivateRoute = lazy(() => import('./helpers/components/PrivateRoute'));

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' errorElement={<CustomErrors />}>
      <Route
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoute />
          </Suspense>
        }
      >
        <Route path='/' element={<Dashboard />} />

        <Route path='doctor' element={<Doctor />}>
          <Route index element={<DoctorsList />} />
          <Route path=':id' element={<DoctorProfile />} />
        </Route>

        <Route
          path='*'
          element={
            <Suspense fallback={<Loader />}>
              <Oops404 />
            </Suspense>
          }
        />
      </Route>

      <Route element={<Auth />}>
        <Route
          path='login'
          element={
            <Suspense fallback={<Loader />}>
              <LoginPage />
            </Suspense>
          }
        />
      </Route>
    </Route>
  )
);

export default Router;
