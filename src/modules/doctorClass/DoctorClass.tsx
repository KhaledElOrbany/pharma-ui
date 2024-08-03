import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

export default function DoctorClass() {
  return (
    <>
      <Helmet>
        <title>Doctor Class</title>
      </Helmet>

      <Outlet />
    </>
  );
}
