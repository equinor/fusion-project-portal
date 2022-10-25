import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

type AppCardProps = {
  name: string;
};
export const AppCard = ({ name }: AppCardProps) => {
  return <StyledAppCard>{name}</StyledAppCard>;
};

const StyledAppCard = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${tokens.colors.ui.background__light.hex};
  }
`;
