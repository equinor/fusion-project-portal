import { MenuButton, PortalHeader } from '@equinor/portal-ui';
import {
  TopBarAvatar,
  useCurrentWorkSurface,
  useMenuItems,
} from '@equinor/portal-core';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const currentWorkSurface = useCurrentWorkSurface();
  const navigate = useNavigate();
  useMenuItems();

  return (
    <PortalHeader
      onLogoClick={() => {
        if (location.href.includes('/apps') && currentWorkSurface) {
          navigate(`/${currentWorkSurface.name}`);
        } else {
          navigate('/');
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
