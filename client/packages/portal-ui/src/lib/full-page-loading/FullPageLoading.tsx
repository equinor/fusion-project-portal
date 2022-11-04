import { CircularProgress } from '@equinor/eds-core-react';
import styled from 'styled-components';

type FullPageLoadingProps = {
  detail: string;
};
export const FullPageLoading = ({ detail }: FullPageLoadingProps) => (
  <StyledFullPageLoading>
    <CircularProgress /> <div>{detail}</div>
  </StyledFullPageLoading>
);

const StyledFullPageLoading = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 1.2em;
  flex-direction: column;
`;
