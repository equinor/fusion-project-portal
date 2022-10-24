import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import PortalApp from './components/portal-app/PortalApp';
import * as portalConfig from './portal.config.json';
import { QueryClientProvider } from 'react-query';

import { createPortalFramework } from '@equinor/portal-core';
import { queryClient } from './utils/queryClient/query-client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

document.title = `${portalConfig.title} | Fusion`;
const Framework = createPortalFramework(portalConfig.config);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Framework>
        <PortalApp />
      </Framework>
    </QueryClientProvider>
  </StrictMode>
);
