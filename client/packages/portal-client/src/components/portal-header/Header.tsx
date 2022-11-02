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
  const { setCurrentWorkSurface } = useWorkSurface();
  const navigate = useNavigate();
  //Preload all menu items
  useNavigateBasedOnWorkSurface();
  useMenuItems();
  return (
    <PortalHeader
      onLogoClick={() => {
        if (location.pathname.includes('/apps') && currentWorkSurface) {
          navigate(`/${currentWorkSurface.name}`);
        } else {
          setCurrentWorkSurface(undefined);
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
