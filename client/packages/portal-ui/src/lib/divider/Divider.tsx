import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

const StyledDivider = styled.hr`
  width: 1px;
  height: auto;
  align-self: stretch;
  border: none;
  background: ${tokens.colors.ui.background__medium.rgba};
`;

export function Divider(): JSX.Element {
  return <StyledDivider />;
}
