import { AppLoader } from '@equinor/portal-core';
import { ContextPage, ViewPage } from '@equinor/portal-pages';
import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PortalMessagePage } from '../portal-error/PortalError';
import { PortalFrame } from '../portal-frame/PortalFrame';

export function PortalRouter() {
  let router = useMemo(() => {
    return createBrowserRouter([
      {
        path: '/',
        element: <PortalFrame />,
        errorElement: <PortalMessagePage title="Fail to setup portal" type='Error' />,
        children: [
          {
            path: '/',
            element: <ViewPage />,
            errorElement: <PortalMessagePage title="Fail to load view page" type={"Error"} />,
          },
          {
            path: '/context-page/*',
            element: <ContextPage />,
            errorElement: <PortalMessagePage title="Fail to load context page" type={"Error"} />,
          },
          {
            path: `/apps/:appKey/*`,
            element: <AppLoader />,
            errorElement: <PortalMessagePage title="Fail to load application" type={"Error"} />,
          },
        ],
      },

    ]);
  }, []);

  return <RouterProvider router={router} />;
}

export default PortalRouter;
