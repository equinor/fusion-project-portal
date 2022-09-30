import React from 'react';

import { PortalLogo } from './Logo';
import { StyledHeader, StyledTopBar, Actions } from './PortalHeaderStyles';

interface PortalHeaderProps {
  Navigation?: React.FC;
  MenuButton: React.FC;
  title: string;
}

export function PortalHeader({
  children,
  Navigation,
  MenuButton,
  title,
}: React.PropsWithChildren<PortalHeaderProps>): JSX.Element {
  return (
    <StyledTopBar>
      <StyledHeader>
        <MenuButton />
        <PortalLogo title={title} />
        {Navigation && <Navigation />}
      </StyledHeader>

      <Actions>{children}</Actions>
    </StyledTopBar>
  );
}

export default PortalHeader;
