import { MenuButton, PortalHeader } from '@equinor/portal-ui';
import { useObservable } from '@equinor/portal-utils';
import { TopBarAvatar, phaseController } from '@equinor/portal-core';

export function Header() {
  const phases = useObservable(phaseController.phases$);

  return (
    <PortalHeader
      onLogoClick={() => {
        const phase = phases?.find(
          (s) => s.id === phaseController.getCurrentPhase()
        )?.name;
        console.log(phase, phases);
        if (location.href.includes('/apps') && phase) {
          window.location.replace(`/${phase.toLowerCase().replace(' ', '-')}`);
        } else {
          window.location.replace(`/`);
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
