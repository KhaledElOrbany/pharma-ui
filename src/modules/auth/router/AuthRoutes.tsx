import { lazy } from 'react';
import { Route } from 'react-router-dom';

const AuthRoot = lazy(() => import('../Auth'));
const LoginPage = lazy(() => import('../views/Login'));
const CustomErrors = lazy(() => import('../../../shared/CustomErrors'));

const AuthRoutes = [
  <Route
    key='auth-routes'
    path='auth'
    element={<AuthRoot />}
    errorElement={<CustomErrors />}
  >
    <Route index element={<LoginPage />} />
  </Route>,
];

export default AuthRoutes;
