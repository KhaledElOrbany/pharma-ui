import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Dashboard from './modules/dashboard/Dashboard';

import User from './modules/user/User';
import UsersList from './modules/user/pages/UsersList';
import UserProfile from './modules/user/pages/UserProfile';

import Doctor from './modules/doctor/Doctor';
import DoctorsList from './modules/doctor/pages/DoctorsList';
import DoctorProfile from './modules/doctor/pages/DoctorProfile';

import { Loader } from './shared/components/loader';

const Layout = lazy(() => import('./shared/layouts/general/GeneralLayout'));
const SimpleLayout = lazy(() => import('./shared/layouts/simple/SimpleLayout'));

const Oops404 = lazy(() => import('./shared/pages/Oops404'));
const LoginPage = lazy(() => import('./modules/auth/views/Login'));
const CustomErrors = lazy(() => import('./shared/pages/CustomErrors'));
const PrivateRoute = lazy(() => import('./helpers/components/PrivateRoute'));

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path='/'
        element={
          <Suspense fallback={<Loader />}>
            <Layout />
          </Suspense>
        }
        errorElement={<CustomErrors />}
      >
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />

          <Route path='users' element={<User />}>
            <Route index element={<UsersList />} />
            <Route path=':id' element={<UserProfile />} />
          </Route>

          <Route path='doctors' element={<Doctor />}>
            <Route index element={<DoctorsList />} />
            <Route path=':id' element={<DoctorProfile />} />
          </Route>
        </Route>
      </Route>

      <Route
        element={
          <Suspense fallback={<Loader />}>
            <SimpleLayout />
          </Suspense>
        }
      >
        <Route path='login' element={<LoginPage />} />
        <Route path='*' element={<Oops404 />} />
      </Route>
    </>
  )
);

export default Router;
