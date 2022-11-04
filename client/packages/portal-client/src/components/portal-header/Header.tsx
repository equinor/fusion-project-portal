import { MenuButton, PortalHeader } from '@equinor/portal-ui';
import {
  TopBarAvatar,
  useCurrentWorkSurfaceId,
  useMenuItems,
} from '@equinor/portal-core';
import { useNavigate } from 'react-router-dom';
import { appMounted } from '@equinor/portal-utils';

export function Header() {
  const { getId, setViewId } = useCurrentWorkSurfaceId();
  const navigate = useNavigate();
  useMenuItems();
  return (
    <PortalHeader
      onLogoClick={() => {
        const id = getId();
        if (appMounted() && id) {
          setViewId(id);
        } else {
          setViewId(undefined);
        }
        navigate('/');
      }}
      MenuButton={MenuButton}
      title="Project Portal"
    >
      <TopBarAvatar />
    </PortalHeader>
  );
}

export default Header;
