import { CurrentViewPage } from '@equinor/portal-pages';
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
            path: '/',
            element: <CurrentViewPage />,
          },
          { path: `/apps/:appKey/*`, element: <AppLoader /> },
        ],
      },
    ]);
  }, []);

  return <RouterProvider router={router} />;
}

export default PortalRouter;
