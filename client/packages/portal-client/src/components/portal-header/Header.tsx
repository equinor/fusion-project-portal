import { MenuButton, PortalHeader } from '@equinor/portal-ui';
import {
  TopBarAvatar,
  useViewController,
  useMenuItems,
} from '@equinor/portal-core';
import { useNavigate } from 'react-router-dom';
import { appMounted } from '@equinor/portal-utils';

export function Header() {
  const { getId, setViewId } = useViewController();
  const navigate = useNavigate();
  useMenuItems();

  const handleLogoClick = () => {
    const id = getId();
    if (appMounted() && id) {
      setViewId(id);
    } else {
      setViewId(undefined);
    }
    navigate('/');
  };

  return (
    <PortalHeader
      onLogoClick={handleLogoClick}
      MenuButton={MenuButton}
      title="Project Portal"
    >
      <TopBarAvatar />
    </PortalHeader>
  );
}

export default Header;
