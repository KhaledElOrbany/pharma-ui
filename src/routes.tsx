import React from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Outlet />,
      children: [
        {
          path: '/doctor',
          element: <div>doctor</div>,
        },
      ],
    },
  ]);

  return routes;
}
