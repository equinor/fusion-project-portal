import { ViewProvider } from '@equinor/portal-core';
import { StyleProvider, MenuProvider, PortalMenu } from '@equinor/portal-ui';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../portal-header/Header';
import { MenuGroups } from '../portal-menu/PortalMenu';

export const PortalFrame = () => (
  <StyleProvider>
    <Wrapper>
      <ViewProvider>
        <MenuProvider>
          <Header />
          <PortalMenu>
            <MenuGroups />
          </PortalMenu>
          <Outlet />
        </MenuProvider>
      </ViewProvider>
    </Wrapper>
  </StyleProvider>
);

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
