import { Paper } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const Wrapper = styled.section`
    height: calc(100vh - 48px);
    width: 100vw;
    display: flex;
    justify-content: center;
`;
export const StyledWrapper = styled.section`
    display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 50%;
`;

export const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  > fwc-searchable-dropdown-provider {
       width: inherit;
  }
`;

export const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
 
`;
