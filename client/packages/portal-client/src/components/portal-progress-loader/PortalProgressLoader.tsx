import { StarProgress, Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Progress = styled(StarProgress)`
  height: auto;
  width: 85px;
`;

interface ProgressLoaderProps {
  title: string;
}

export function PortalProgressLoader({ title }: ProgressLoaderProps) {
  return (
    <Wrapper>
      <Progress />
      <Typography variant="h5"> {title}</Typography>
    </Wrapper>
  );
}
