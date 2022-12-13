import { ContextProvider, MenuProvider, ViewProvider } from '@equinor/portal-core';
import { PortalSideSheet, StyleProvider } from '@equinor/portal-ui';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../portal-header/Header';
import { MenuGroups } from '../portal-menu/PortalMenu';
export const PortalFrame = () => (
  <StyleProvider>
    <Wrapper>
      <ContextProvider>
        <ViewProvider>
          <MenuProvider>
            <Header />
            <MenuGroups />
            <Outlet />
          </MenuProvider>
          <PortalSideSheet />
        </ViewProvider>
      </ContextProvider>
    </Wrapper>
  </StyleProvider>
);

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
