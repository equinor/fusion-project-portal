import { HomePage, WorkSurfacePage } from '@equinor/portal-pages';
import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLoader } from '../app-loader/AppLoader';
import { PortalFrame } from '../portal-frame/PortalFrame';

export function PortalRouter() {
  let router = useMemo(() => {
    return createBrowserRouter([
      {
        path: '/',
        element: <PortalFrame />,
        children: [
          {
            path: ':workSurfaceKey',
            element: <WorkSurfacePage />,
          },
          { path: `/apps/:appKey/*`, element: <AppLoader /> },
          {
            path: '/',
            element: <HomePage />,
          },
        ],
      },
    ]);
  }, []);

  return <RouterProvider router={router} />;
}

export default PortalRouter;
