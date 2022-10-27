import { MenuProvider, PortalMenu, StyleProvider } from '@equinor/portal-ui';
import Header from '../portal-header/Header';
import { MenuGroups } from '../portal-menu/PortalMenu';

export function PortalApp() {
  return (
    <StyleProvider>
      <MenuProvider>
        <Header />
        <PortalMenu>
          <MenuGroups />
        </PortalMenu>
      </MenuProvider>
    </StyleProvider>
  );
}

export default PortalApp;
