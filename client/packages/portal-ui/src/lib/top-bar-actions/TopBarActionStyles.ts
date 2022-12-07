import { Button, Menu } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const StyledMenuItem = styled(Menu.Item)`
  min-width: 280px;
  padding: 0px;
  padding-left: 24px;
  padding-right: 8px;
  height: 48px;
`;

export const StyledItem = styled.div`
  min-width: 250px;
  padding-left: 0.5rem;
`;

export const StyledTopBarButton = styled(Button)`
  height: 40px;
  width: 40px;
`;

export const StyledActionMenuButton = styled(Button)`
  height: 48px;
  width: 48px;
`;

export const StyledActionListWrapper = styled.span`
  display: flex;
`;
