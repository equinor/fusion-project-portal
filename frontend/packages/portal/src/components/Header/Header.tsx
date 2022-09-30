import { useCurrentUser } from '@equinor/fusion-framework-react/hooks';
import Avatar from '@equinor/fusion-react-avatar';
import { MenuButton, PortalHeader } from '@fusion-pe-portal/portal-ui';

export function Header() {
  const account = useCurrentUser();
  return (
    <PortalHeader MenuButton={MenuButton} title="Project Portal">
      <Avatar
        src={`https://fusion.equinor.com/images/profiles/${account?.localAccountId}`}
      />
    </PortalHeader>
  );
}

export default Header;
