import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { HEXString } from './types';

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${tokens.colors.ui.background__default.hex};
`;

export const StyledHeader = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`;

export const StyledTitleContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
`;

export const StyledTitleWrapper = styled.div`
  display: flex;
`;

export const StyledActionsWrapper = styled.div`
  display: flex;
`;

export const StyledIndicator = styled.span<{ color?: HEXString }>`
  background-color: ${({ color }) => color || 'red'};
  height: 48px;
  width: 16px;
`;

export const ContentWrapper = styled.div``;
