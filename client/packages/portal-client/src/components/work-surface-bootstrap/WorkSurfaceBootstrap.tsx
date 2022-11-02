import { useWorkSurface } from '@equinor/portal-core';
import { LoadingWorkSurfacesTransition } from '@equinor/portal-pages';
import { useObservable } from '@equinor/portal-utils';
import { ReactNode, useEffect } from 'react';
import { FailedToLoadWorkSurfaces } from '../failed-work-surfaces/FailedToLoadWorkSurfaces';

type WorkSurfaceBootstrapProps = {
  children: ReactNode;
};

export const WorkSurfaceBootstrap = ({
  children,
}: WorkSurfaceBootstrapProps) => {
  const { error$, isLoading$, init } = useWorkSurface();

  useEffect(() => {
    init();
  }, []);

  const isLoading = useObservable(isLoading$);

  const error = useObservable(error$);
  if (isLoading || isLoading === undefined)
    return <LoadingWorkSurfacesTransition />;
  if (error) return <FailedToLoadWorkSurfaces error={error as Response} />;

  return <>{children}</>;
};
