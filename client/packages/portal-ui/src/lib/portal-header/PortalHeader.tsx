import React from 'react';

import { PortalLogo } from './Logo';
import { Actions, StyledHeader, StyledTopBar } from './PortalHeaderStyles';

interface PortalHeaderProps {
  Navigation?: React.FC;
  MenuButton: React.FC;
  title: string;
  onLogoClick: () => void;
}

export function PortalHeader({
  children,
  Navigation,
  MenuButton,
  title,
  onLogoClick,
}: React.PropsWithChildren<PortalHeaderProps>): JSX.Element {
  return (
    <StyledTopBar>
      <StyledHeader>
        <MenuButton />
        <PortalLogo title={title} onClick={onLogoClick} />
        {Navigation && <Navigation />}
      </StyledHeader>

      <Actions>{children}</Actions>
    </StyledTopBar>
  );
}

export default PortalHeader;
