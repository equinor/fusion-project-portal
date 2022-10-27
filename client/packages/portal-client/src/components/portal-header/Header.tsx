import { MenuButton, PortalHeader } from '@equinor/portal-ui';
import { phaseController } from 'packages/portal-core/src/phases/phases';
import { TopBarAvatar } from '../../../../portal-core/src';

export function Header() {
  return (
    <PortalHeader
      onLogoClick={() => {
        if (location.href.includes('apps')) {
          window.location.replace('/');
        } else {
          phaseController.clearSelectedPhase();
        }
      }}
      MenuButton={MenuButton}
      title="Project Portal"
    >
      <TopBarAvatar />
    </PortalHeader>
  );
}

export default Header;
