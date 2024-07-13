import { Helmet } from 'react-helmet-async';
import { Outlet, Route } from 'react-router-dom';
import DoctorProfile from './pages/DoctorProfile';
import DoctorsList from './pages/DoctorsList';

export const DoctorRoutes = [
  <Route key='doctor-routes' path='doctor' element={<Doctor />}>
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
