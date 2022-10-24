import { MenuProvider, PortalMenu, StyleProvider } from '@equinor/portal-ui';

import Header from '../portal-header/Header';
import { PortalRouter } from '../portal-router/Router';

export function PortalApp() {
  return (
    <StyleProvider>
      <MenuProvider>
        <Header />
        <PortalMenu>Portal Menu</PortalMenu>
        <PortalRouter />
      </MenuProvider>
    </StyleProvider>
  );
}

export default PortalApp;
