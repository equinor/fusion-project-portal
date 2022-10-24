import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Early } from './components/Icons/Early';
import { Execution } from './components/Icons/Execution';
import { Renewable } from './components/Icons/Renewable';

import PortalApp from './components/PortalApp/PortalApp';
import * as portalConfig from './portal.config.json';

import { createPortalFramework, WorkSurfaces } from '@equinor/portal-core';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const phases: WorkSurfaces[] = [
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

document.title = `${portalConfig.title} | Fusion`;
const Framework = createPortalFramework({ ...portalConfig.config, phases });

root.render(
  <StrictMode>
    <Framework>
      <PortalApp />
    </Framework>
  </StrictMode>
);
