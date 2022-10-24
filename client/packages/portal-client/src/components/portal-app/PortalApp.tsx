import { MenuProvider, PortalMenu, StyleProvider } from '@equinor/portal-ui';
import { Phase } from '../portal-content/PortalContent';
import Header from '../portal-header/Header';

export function PortalApp() {
  return (
    <StyleProvider>
      <MenuProvider>
        <Header />
        <PortalMenu>Portal Menu</PortalMenu>
        <Phase />
      </MenuProvider>
    </StyleProvider>
  );
}

export default PortalApp;
