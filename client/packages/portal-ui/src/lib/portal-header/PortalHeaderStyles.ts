import { TopBar } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const StyledHeader = styled(TopBar.Header)`
  grid-template-columns: auto auto auto auto auto auto;
  gap: 8px;
`;

export const StyledTopBar = styled(TopBar)`
  padding: 0px;
  height: 48px;
`;

export const Actions = styled(TopBar.Actions)`
  padding-right: 1rem;
`;
