import { HomePage, WorkSurfacePage } from '@equinor/portal-pages';
import { StyleProvider, MenuProvider, PortalMenu } from '@equinor/portal-ui';
import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { AppLoader } from '../app-loader/AppLoader';
import Header from '../portal-header/Header';
import { MenuGroups } from '../portal-menu/PortalMenu';

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

const PortalFrame = () => (
  <StyleProvider>
    <MenuProvider>
      <Header />
      <PortalMenu>
        <MenuGroups />
      </PortalMenu>
      <Outlet />
    </MenuProvider>
  </StyleProvider>
);
