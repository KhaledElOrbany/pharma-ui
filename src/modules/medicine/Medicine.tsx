import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

export default function Medicine() {
  return (
    <>
      <Helmet>
        <title>Medicine</title>
      </Helmet>

      <Outlet />
    </>
  );
}
