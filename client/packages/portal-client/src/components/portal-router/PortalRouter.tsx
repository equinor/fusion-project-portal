import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLoader } from '../app-loader/AppLoader';
import { PortalContent } from '../portal-content/PortalContent';

export function PortalRouter() {
  let router = useMemo(() => {
    return createBrowserRouter([
      {
        path: '/',
        element: <PortalContent />,
      },
      {
        path: '/:workSurfaceKey',
        element: <PortalContent />,
      },
      {
        path: `/apps/:appKey/*`,
        element: <AppLoader />,
      },
    ]);
  }, []);

  return <RouterProvider router={router} />;
}

export default PortalRouter;
