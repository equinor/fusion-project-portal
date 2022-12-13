import { useMenuContext, useViewController } from '@equinor/portal-core';
import { MenuButton, PortalHeader, TopBarActions } from '@equinor/portal-ui';
import { appMounted } from '@equinor/portal-utils';
import { useNavigate } from 'react-router-dom';
import { PortalBreadcrumbs } from '../portal-breadcrumbs/PortalBreadcrumbs';

export function Header() {
  const { getId, setViewId } = useViewController();
  const navigate = useNavigate();
  useMenuContext();

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
      Navigation={PortalBreadcrumbs}
    >
      <TopBarActions />
    </PortalHeader>
  );
}

export default Header;
