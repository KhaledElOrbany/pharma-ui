import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

export default function DoctorRoot() {
  return (
    <>
      <Helmet>
        <title>Doctor</title>
      </Helmet>

      <Outlet />
    </>
  );
}
