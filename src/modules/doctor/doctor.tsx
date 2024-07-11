import { Helmet } from 'react-helmet-async';
import DoctorsList from './components/DoctorsList';
import { Route, Routes } from 'react-router-dom';
import DoctorProfile from './components/DoctorProfile';

export default function DoctorRoot() {
  return (
    <>
      <Helmet>
        <title>Doctor Profile</title>
      </Helmet>

      <Routes>
        <Route index element={<DoctorsList />} path='/' />
        <Route element={<DoctorProfile />} path='/:id' />
      </Routes>
    </>
  );
}
