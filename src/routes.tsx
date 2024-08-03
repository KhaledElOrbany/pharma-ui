/* eslint-disable prettier/prettier */
import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Loader from './shared/components/loader';

const Dashboard = lazy(() => import('./modules/dashboard/Dashboard'));

const User = lazy(() => import('./modules/user/User'));
const UsersList = lazy(() => import('./modules/user/pages/UsersList'));
const UserProfile = lazy(() => import('./modules/user/pages/UserProfile'));

const Doctor = lazy(() => import('./modules/doctor/Doctor'));
const DoctorsList = lazy(() => import('./modules/doctor/pages/DoctorsList'));
const DoctorProfile = lazy(() => import('./modules/doctor/pages/DoctorProfile'));

const DoctorClass = lazy(() => import('./modules/doctorClass/DoctorClass'));
const DoctorClassesList = lazy(() => import('./modules/doctorClass/pages/DoctorClassesList'));
const DoctorClassProfile = lazy(() => import('./modules/doctorClass/pages/DoctorClassProfile'));

const Pharmacy = lazy(() => import('./modules/pharmacy/Pharmacy'));
const PharmaciesList = lazy(() => import('./modules/pharmacy/pages/PharmaciesList'));
const PharmacyProfile = lazy(() => import('./modules/pharmacy/pages/PharmacyProfile'));

const Medicine = lazy(() => import('./modules/medicine/Medicine'));
const MedicinesList = lazy(() => import('./modules/medicine/pages/MedicinesList'));
const MedicineProfile = lazy(() => import('./modules/medicine/pages/MedicineProfile'));

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
