import { MenuProvider, PortalMenu, StyleProvider } from '@equinor/portal-ui';

import Header from '../portal-header/Header';
import { MenuGroups } from '../portal-menu/PortalMenu';
import { PortalRouter } from '../portal-router/Router';

export function PortalApp() {
  return (
    <StyleProvider>
      <MenuProvider>
        <Header />
        <PortalMenu>
          <MenuGroups />
        </PortalMenu>
        <PortalRouter />
      </MenuProvider>
    </StyleProvider>
  );
}

export default PortalApp;
