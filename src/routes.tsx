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

import DoctorClass from './modules/doctorClass/DoctorClass';
import DoctorClassesList from './modules/doctorClass/pages/DoctorClassesList';
import DoctorClassProfile from './modules/doctorClass/pages/DoctorClassProfile';

import Pharmacy from './modules/pharmacy/Pharmacy';
import PharmaciesList from './modules/pharmacy/pages/PharmaciesList';
import PharmacyProfile from './modules/pharmacy/pages/PharmacyProfile';

import Medicine from './modules/medicine/Medicine';
import MedicinesList from './modules/medicine/pages/MedicinesList';
import MedicineProfile from './modules/medicine/pages/MedicineProfile';

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

          <Route path='doctorClasses' element={<DoctorClass />}>
            <Route index element={<DoctorClassesList />} />
            <Route path=':id' element={<DoctorClassProfile />} />
          </Route>

          <Route path='pharmacies' element={<Pharmacy />}>
            <Route index element={<PharmaciesList />} />
            <Route path=':id' element={<PharmacyProfile />} />
          </Route>

          <Route path='medicines' element={<Medicine />}>
            <Route index element={<MedicinesList />} />
            <Route path=':id' element={<MedicineProfile />} />
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
