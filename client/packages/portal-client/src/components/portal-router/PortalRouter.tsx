import { CurrentWorkSurfaceIdProvider } from '@equinor/portal-core';
import { HomePage, WorkSurfacePage } from '@equinor/portal-pages';
import { MenuProvider, PortalMenu, StyleProvider } from '@equinor/portal-ui';
import { useMemo } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import styled from 'styled-components';
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
    <CurrentWorkSurfaceIdProvider>
      <Wrapper>
        <MenuProvider>
          <Header />
          <PortalMenu>
            <MenuGroups />
          </PortalMenu>
          <Outlet />
        </MenuProvider>
      </Wrapper>
    </CurrentWorkSurfaceIdProvider>
  </StyleProvider>
);

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
