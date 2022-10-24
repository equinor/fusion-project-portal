import { MenuButton, PortalHeader } from '@equinor/portal-ui';
import { clearSelectedPhase } from '../../utils/phases/phases';

export function Header() {
  return (
    <PortalHeader
      onLogoClick={clearSelectedPhase}
      MenuButton={MenuButton}
      title="Project Portal"
    >
      Hello Project Portal
    </PortalHeader>
  );
}

export default Header;
