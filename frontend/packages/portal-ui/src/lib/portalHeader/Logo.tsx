import { Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { PortalIcon } from './Icon';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledTitle = styled(Typography)`
  padding-left: 0.5rem;
`;

interface PortalLogoProps {
  title: string;
}

export function PortalLogo({ title }: PortalLogoProps): JSX.Element {
  return (
    <StyledWrapper>
      <PortalIcon />
      <StyledTitle variant="h6">{title}</StyledTitle>
    </StyledWrapper>
  );
}
