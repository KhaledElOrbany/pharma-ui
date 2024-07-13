import { lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, Route } from 'react-router-dom';

const DoctorsList = lazy(() => import('./views/DoctorsList'));
const DoctorProfile = lazy(() => import('./views/DoctorProfile'));
const CustomErrors = lazy(() => import('../../shared/CustomErrors'));

export const DoctorRoutes = [
  <Route
    key='doctor-routes'
    path='doctor'
    element={<Doctor />}
    errorElement={<CustomErrors />}
  >
    <Route index element={<DoctorsList />} />
    <Route path=':id' element={<DoctorProfile />} />
  </Route>,
];

export default function Doctor() {
  return (
    <>
      <Helmet>
        <title>Doctor</title>
      </Helmet>

      <Outlet />
    </>
  );
}
