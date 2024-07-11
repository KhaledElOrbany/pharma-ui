import { createBrowserRouter, Outlet } from 'react-router-dom';

import DoctorRoot from './modules/doctor/doctor';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        path: '/doctor',
        element: <DoctorRoot />,
      },
    ],
  },
]);

export default Router;
