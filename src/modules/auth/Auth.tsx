import { lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, Route } from 'react-router-dom';

const LoginPage = lazy(() => import('./views/Login'));
const CustomErrors = lazy(() => import('../../shared/CustomErrors'));

export const AuthRoutes = [
  <Route
    key='auth-routes'
    path='auth'
    element={<Auth />}
    errorElement={<CustomErrors />}
  >
    <Route index element={<LoginPage />} />
  </Route>,
];

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
