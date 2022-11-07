import {
  TopBarAvatar,
  useMenuItems,
  useViewController,
} from '@equinor/portal-core';
import { MenuButton, PortalHeader } from '@equinor/portal-ui';
import { appMounted } from '@equinor/portal-utils';
import { useNavigate } from 'react-router-dom';

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
      title="PRD Portal"
    >
      <TopBarAvatar />
    </PortalHeader>
  );
}

export default Header;
