import { HomePage, Phase } from '@equinor/portal-pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Early } from '../Icons/Early';
import { Execution } from '../Icons/Execution';
import { Renewable } from '../Icons/Renewable';

interface Phase {
  id: string;
  title: string;
  description: string;
  icon: string | React.FC;
  active?: boolean;
}

const phases: Phase[] = [
  {
    id: 'early-pase',
    title: 'Early phase',
    description: 'Here you can find all the tools that you need.',
    icon: Early,
    active: true,
  },
  {
    id: 'execution-pase',
    title: 'Project Execution',
    description: 'Go to this phase to work with projects that are beyond DG3.',
    icon: Execution,
    active: true,
  },
  {
    id: 'renewable-pase',
    title: 'Renewable Execution',
    description:
      'Go to this phase to work with renewable projects that are beyond DG3.',
    icon: Renewable,
    // active: true,
  },
];

const phaseRoutes = phases.map((p) => {
  return {
    path: `/:${p.id}`,
    element: <Phase {...p} />,
  };
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage phases={phases} />,
  },
  ...phaseRoutes,
]);

export function PortalRouter() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default PortalRouter;
