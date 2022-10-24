import { MenuProvider, PortalMenu, StyleProvider } from '@equinor/portal-ui';
import { PortalContent } from '../portal-content/PortalContent';
import Header from '../portal-header/Header';

export function PortalApp() {
  return (
    <StyleProvider>
      <MenuProvider>
        <Header />
        <PortalMenu>Portal Menu</PortalMenu>
        <PortalContent />
      </MenuProvider>
    </StyleProvider>
  );
}

export default PortalApp;
