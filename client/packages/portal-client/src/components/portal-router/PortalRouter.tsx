import { useFramework, useHttpClient } from '@equinor/fusion-framework-react/hooks';
import { useWorkSurface } from '@equinor/portal-core';
import { HomePage, WorkSurfacePage } from '@equinor/portal-pages';
import { MenuProvider, PortalMenu, StyleProvider } from '@equinor/portal-ui';
import { useObservable } from '@equinor/portal-utils';
import { LoadingWorkSurfacesTransition } from 'packages/portal-pages/src/pages/home-page/LoadingPhaseTransition';
import { ReactNode, useEffect, useMemo } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { map } from 'rxjs';
import styled from 'styled-components';
import { AppLoader } from '../app-loader/AppLoader';
import { FailedToLoadWorkSurfaces } from '../failed-work-surfaces/FailedToLoadWorkSurfaces';
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
    <Wrapper>
      <MenuProvider>
        <Header />
        <PortalMenu>
          <MenuGroups />
        </PortalMenu>
        <PhaseLoader>
          <Outlet />
        </PhaseLoader>
      </MenuProvider>
    </Wrapper>
  </StyleProvider>
);

type PhaseLoaderProps = {
  children: ReactNode;
};

const PhaseLoader = ({ children }: PhaseLoaderProps) => {
  const { error$, isLoading$, init } = useWorkSurface();


  useEffect(() => {
    init();
  },[])

  const isLoading = useObservable(isLoading$);
  const error = useObservable(error$);
  if (isLoading) return <LoadingWorkSurfacesTransition />;
  if (error) return <FailedToLoadWorkSurfaces error={error as Response} />;

  return <>{children}</>;
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
