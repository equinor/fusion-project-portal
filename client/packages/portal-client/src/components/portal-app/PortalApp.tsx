import { MenuProvider, PortalMenu, StyleProvider } from '@equinor/portal-ui';
import { PortalContent } from '../portal-content/PortalContent';
import Header from '../portal-header/Header';
import { MenuGroups } from '../portal-menu/PortalMenu';
import PortalRouter from '../portal-router/PortalRouter';

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
