import { MenuButton, PortalHeader } from '@equinor/portal-ui';
import { TopBarAvatar } from '@equinor/portal-core';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();

  return (
    <PortalHeader
      onLogoClick={() => {
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
