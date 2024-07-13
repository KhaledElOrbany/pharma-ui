import { lazy } from 'react';
import { Route } from 'react-router-dom';

const DoctorRoot = lazy(() => import('../Doctor'));
const DoctorsList = lazy(() => import('../views/DoctorsList'));
const DoctorProfile = lazy(() => import('../views/DoctorProfile'));
const CustomErrors = lazy(() => import('../../../shared/CustomErrors'));

const DoctorRoutes = [
  <Route
    key='doctor-routes'
    path='doctor'
    element={<DoctorRoot />}
    errorElement={<CustomErrors />}
  >
    <Route index element={<DoctorsList />} />
    <Route path=':id' element={<DoctorProfile />} />
  </Route>,
];

export default DoctorRoutes;
