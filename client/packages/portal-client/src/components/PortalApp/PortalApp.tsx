import { MenuProvider, PortalMenu, StyleProvider } from '@equinor/portal-ui';

import Header from '../Header/Header';
import { PortalRouter } from '../Router/Router';

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
