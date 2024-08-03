import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

export default function Pharmacy() {
  return (
    <>
      <Helmet>
        <title>Pharmacy</title>
      </Helmet>

      <Outlet />
    </>
  );
}
