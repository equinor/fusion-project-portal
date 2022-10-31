import { MenuButton, PortalHeader } from '@equinor/portal-ui';
import { TopBarAvatar, useMenuItems, usePhases } from '@equinor/portal-core';

export function Header() {
  const { phases, clearWorkSurface, currentWorkSurface, setWorkSurface } =
    usePhases();

  useMenuItems();

  return (
    <PortalHeader
      onLogoClick={() => {
        const phase = phases?.find(
          (s) => s.id === currentWorkSurface?.id
        )?.name;
        if (location.href.includes('/apps') && phase && currentWorkSurface) {
          setWorkSurface(currentWorkSurface);
        } else {
          clearWorkSurface();
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
