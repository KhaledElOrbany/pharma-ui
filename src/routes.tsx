import { createBrowserRouter, Outlet } from 'react-router-dom';

import DoctorRoot from './modules/doctor/doctor';
import Dashboard from './modules/dashboard/dashboard';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/doctor',
        element: <DoctorRoot />,
      },
    ],
  },
]);

export default Router;
