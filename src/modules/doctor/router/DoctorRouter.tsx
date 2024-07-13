import { lazy } from 'react';
import { Route } from 'react-router-dom';
import CustomErrors from '../../../shared/CustomErrors';

const DoctorRoot = lazy(() => import('../doctor'));
const DoctorsList = lazy(() => import('../components/DoctorsList'));
const DoctorProfile = lazy(() => import('../components/DoctorProfile'));

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
