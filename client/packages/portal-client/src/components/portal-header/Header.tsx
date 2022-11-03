import { MenuButton, PortalHeader } from '@equinor/portal-ui';
import {
  TopBarAvatar,
  useCurrentWorkSurfaceId,
  useMenuItems,
} from '@equinor/portal-core';

export function Header() {
  const { getId, setViewId } = useCurrentWorkSurfaceId();
  useMenuItems();

  return (
    <PortalHeader
      onLogoClick={() => {
        const id = getId();
        if (location.href.includes('/apps') && id) {
          setViewId(id);
        } else {
          setViewId(undefined);
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
