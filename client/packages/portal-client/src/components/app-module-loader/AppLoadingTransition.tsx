import { CircularProgress } from '@equinor/eds-core-react';
import styled from 'styled-components';

const StyledAppLoadingTransition = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1em;
`;

export const AppLoadingTransition = () => (
  <StyledAppLoadingTransition>
    <CircularProgress size={48} />
    <div>Loading app</div>
  </StyledAppLoadingTransition>
);
