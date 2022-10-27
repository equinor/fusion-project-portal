import { HomePage, WorkSurfacePage } from '@equinor/portal-pages';
import { StyleProvider, MenuProvider, PortalMenu } from '@equinor/portal-ui';
import { ReactNode, useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLoader } from '../app-loader/AppLoader';
import Header from '../portal-header/Header';
import { MenuGroups } from '../portal-menu/PortalMenu';

export function PortalRouter() {
  let router = useMemo(() => {
    return createBrowserRouter([
      {
        path: '/',
        element: (
          <PortalFrame>
            <HomePage />
          </PortalFrame>
        ),
      },
      {
        path: '/:workSurfaceKey',
        element: (
          <PortalFrame>
            <WorkSurfacePage />
          </PortalFrame>
        ),
      },
      {
        path: `/apps/:appKey/*`,
        element: (
          <PortalFrame>
            <AppLoader />
          </PortalFrame>
        ),
      },
    ]);
  }, []);

  return <RouterProvider router={router} />;
}

export default PortalRouter;

const PortalFrame = ({ children }: { children: ReactNode }) => (
  <StyleProvider>
    <MenuProvider>
      <Header />
      <PortalMenu>
        <MenuGroups />
      </PortalMenu>
      {children}
    </MenuProvider>
  </StyleProvider>
);
