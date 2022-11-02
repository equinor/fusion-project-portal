import { MenuButton, PortalHeader } from '@equinor/portal-ui';
import {
  TopBarAvatar,
  useCurrentWorkSurface,
  useMenuItems,
  useNavigateBasedOnWorkSurface,
  useWorkSurface,
} from '@equinor/portal-core';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const currentWorkSurface = useCurrentWorkSurface();
  const module = useWorkSurface();
  useNavigateBasedOnWorkSurface();
  const navigate = useNavigate();
  //Preload all menu items
  useMenuItems();
  return (
    <PortalHeader
      onLogoClick={() => {
        if (location.pathname.includes('/apps') && currentWorkSurface) {
          navigate(`/${currentWorkSurface.name}`);
        } else {
          module.setCurrentWorkSurface(undefined);
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
