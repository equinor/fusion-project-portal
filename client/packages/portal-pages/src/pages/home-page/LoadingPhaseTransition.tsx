import { CircularProgress } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const LoadingWorkSurfacesTransition = () => (
  <StyledLoadingWorkSurfacesTransition>
    <CircularProgress /> <div>Loading worksurfaces</div>
  </StyledLoadingWorkSurfacesTransition>
);

const StyledLoadingWorkSurfacesTransition = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 1.2em;
  flex-direction: column;
`;
