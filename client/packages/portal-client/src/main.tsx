import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import createPortalFramework from './assets/createPortalFramework/createPortalFramework';
import PortalApp from './components/PortalApp/PortalApp';
import * as portalConfig from './portal.config.json';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

document.title = `${portalConfig.title} | Fusion`;
const Framework = createPortalFramework(portalConfig.config);

root.render(
  <StrictMode>
    <Framework>
      <PortalApp />
    </Framework>
  </StrictMode>
);
