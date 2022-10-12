import { MenuButton, PortalHeader } from '@equinor/portal-ui';

export function Header() {
  return (
    <PortalHeader MenuButton={MenuButton} title="Project Portal">
      Hello Project Portal
    </PortalHeader>
  );
}

export default Header;
