import { StyleProvider, MenuProvider, PortalMenu } from '@equinor/portal-ui';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../portal-header/Header';
import { MenuGroups } from '../portal-menu/PortalMenu';
import { WorkSurfaceBootstrap } from '../work-surface-bootstrap/WorkSurfaceBootstrap';

export const PortalFrame = () => (
  <StyleProvider>
    <Wrapper>
      <MenuProvider>
        <Header />
        <PortalMenu>
          <MenuGroups />
        </PortalMenu>
        <WorkSurfaceBootstrap>
          <Outlet />
        </WorkSurfaceBootstrap>
      </MenuProvider>
    </Wrapper>
  </StyleProvider>
);

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
