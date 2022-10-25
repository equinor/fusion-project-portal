import { MenuButton, PortalHeader } from '@equinor/portal-ui';
import { phaseController } from 'packages/portal-core/src/phases/phases';
import { TopBarAvatar } from '../../../../portal-core/src';
import { PortalBreadcrumbs } from '../portal-breadcrumbs/PortalBreadcrumbs';

export function Header() {
  return (
    <PortalHeader
      onLogoClick={phaseController.clearSelectedPhase}
      MenuButton={MenuButton}
      title="Project Portal"
      Navigation={PortalBreadcrumbs}
    >
      <TopBarAvatar />
    </PortalHeader>
  );
}

export default Header;
