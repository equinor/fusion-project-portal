import { ContextPage, ViewPage } from '@equinor/portal-pages';
import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLoader } from '../app-loader/AppLoader';
import { PortalErrorPage } from '../portal-error/PortalError';
import { PortalFrame } from '../portal-frame/PortalFrame';

export function PortalRouter() {
  let router = useMemo(() => {
    return createBrowserRouter([
      {
        path: '/',
        element: <PortalFrame />,
        errorElement: <PortalErrorPage title="Fail to setup portal" />,
        children: [
          {
            path: '/',
            element: <ViewPage />,
            errorElement: <PortalErrorPage title="Fail to load view page" />,
          },
          {
            path: '/context/',
            element: <ContextPage />,
            errorElement: <PortalErrorPage title="Fail to load context page" />,
          },
          {
            path: `/apps/:appKey/*`,
            element: <AppLoader />,
            errorElement: <PortalErrorPage title="Fail to load application" />,
          },
        ],
      },
      
    ]);
  }, []);

  return <RouterProvider router={router} />;
}

export default PortalRouter;
