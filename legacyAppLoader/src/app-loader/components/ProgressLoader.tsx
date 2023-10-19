import { StarProgress, Typography } from "@equinor/eds-core-react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  height: 85vh;
`;

const StyledProgress = styled(StarProgress)`
  height: auto;
  width: 85px;
`;

type ProgressLoaderProps = {
  title: string;
};
const Wrapper = styled.section`
  height: calc(100vh - var(--portal-header-height));
  width: 100vw;
`;

export function ProgressLoader({ title }: ProgressLoaderProps) {
  return (
    <Wrapper>
      <StyledWrapper>
        <StyledProgress />
        <Typography variant="h5"> {title}</Typography>
      </StyledWrapper>
    </Wrapper>
  );
}
