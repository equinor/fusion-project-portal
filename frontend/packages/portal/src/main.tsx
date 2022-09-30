import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import Portal from './portalApp/portalApp';

import { createPortalFramework } from '@fusion-pe-portal/portal-ui';
import * as portalConfig from './portal.config.json';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

document.title = `Fusion | ${portalConfig.title}`;
const Framework = createPortalFramework(portalConfig.config);

root.render(
  <StrictMode>
    <Framework>
      <Portal />
    </Framework>
  </StrictMode>
);
