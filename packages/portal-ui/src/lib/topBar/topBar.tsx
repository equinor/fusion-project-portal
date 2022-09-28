import { Breadcrumbs, Button, Icon, TopBar } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { PortalIcon } from './icon';

/* eslint-disable-next-line */
export interface PortalTopBarPros {}

const StyledHeader = styled(TopBar.Header)`
  grid-template-columns: auto auto auto auto auto auto;
  gap: 8px;
`;

const StyledTopBar = styled(TopBar)`
  padding: 8px 16px;
`;

export function PortalTopBar(props: PortalTopBarPros) {
  return (
    <StyledTopBar>
      <StyledHeader>
        <Button variant="ghost_icon" aria-label="open menu">
          <Icon name="menu" />
        </Button>
        <PortalIcon />
        <Breadcrumbs>
          <Breadcrumbs.Breadcrumb href="#">Fusion</Breadcrumbs.Breadcrumb>
          <Breadcrumbs.Breadcrumb href="#">
            Project Portal
          </Breadcrumbs.Breadcrumb>
          <Breadcrumbs.Breadcrumb href="#" aria-current="page">
            App
          </Breadcrumbs.Breadcrumb>
        </Breadcrumbs>
      </StyledHeader>
      <TopBar.CustomContent></TopBar.CustomContent>
      <TopBar.Actions></TopBar.Actions>
    </StyledTopBar>
  );
}

export default PortalTopBar;
