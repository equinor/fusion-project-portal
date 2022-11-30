import { CircularProgress } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const LoadingMenu = () => (
  <StyledLoadingMenu>
    <CircularProgress />
    <div>Loading apps</div>
  </StyledLoadingMenu>
);

const StyledLoadingMenu = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.2em;
`;
