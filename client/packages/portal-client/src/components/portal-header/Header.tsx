import { MenuButton, PortalHeader } from '@equinor/portal-ui';
import { phaseController } from 'packages/portal-core/src/phases/phases';

export function Header() {
  return (
    <PortalHeader
      onLogoClick={phaseController.clearSelectedPhase}
      MenuButton={MenuButton}
      title="Project Portal"
    >
      Hello Project Portal
    </PortalHeader>
  );
}

export default Header;
