import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

export default function Auth() {
  return (
    <>
      <Helmet>
        <title>Auth</title>
      </Helmet>

      <Outlet />
    </>
  );
}
