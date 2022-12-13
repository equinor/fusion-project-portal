import React from 'react';
import { Breadcrumbs } from '../breadcrumbs/PortalBreadcrumbs';
import { TopBarActions } from '../top-bar-actions';

import { PortalLogo } from './Logo';
import { StyledActionsWrapper, StyledHeader, StyledTopBar } from './PortalHeaderStyles';

interface PortalHeaderProps {
  MenuButton: React.FC;
  title: string;
  onLogoClick: () => void;
}

export function PortalHeader({
  MenuButton,
  title,
  onLogoClick,
}: PortalHeaderProps): JSX.Element {
  return (
    <StyledTopBar>
      <StyledHeader>
        <MenuButton />
        <PortalLogo title={title} onClick={onLogoClick} />
        <Breadcrumbs />
      </StyledHeader>

      <StyledActionsWrapper>
        <TopBarActions />
      </StyledActionsWrapper>
    </StyledTopBar>
  );
}

export default PortalHeader;
