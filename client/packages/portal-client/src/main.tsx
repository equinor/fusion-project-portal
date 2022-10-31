import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { QueryClientProvider } from 'react-query';
import PortalApp from './components/portal-app/PortalApp';
import * as portalConfig from './portal.config.json';

import { StarProgress } from '@equinor/eds-core-react';
import Framework from '@equinor/fusion-framework-react';
import { createPortalFramework } from '@equinor/portal-core';
import { queryClient } from './utils/queryClient/query-client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

document.title = `${portalConfig.title} | Fusion`;

const configure = await createPortalFramework(portalConfig.config);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Framework configure={configure} fallback={<StarProgress />}>
        <PortalApp />
      </Framework>
    </QueryClientProvider>
  </StrictMode>
);
