import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

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
