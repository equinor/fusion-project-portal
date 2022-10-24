import { usePhases } from '@equinor/portal-core';

import { HomePage, PhasePage } from '@equinor/portal-pages';
import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export function PortalRouter() {
  const phases = usePhases();

  let router = useMemo(() => {
    const phaseRoutes = phases.map((p) => {
      return {
        path: `/:${p.id}`,
        element: <PhasePage {...p} />,
      };
    });

    return createBrowserRouter([
      {
        path: '/',
        element: <HomePage phases={phases} />,
      },
      ...phaseRoutes,
    ]);
  }, [phases.length]);
  phases;
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default PortalRouter;
