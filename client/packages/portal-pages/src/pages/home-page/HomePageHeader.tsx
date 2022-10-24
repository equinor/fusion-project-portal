import { Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { HomePageIcon } from './HomePageIcon';

const StyledSection = styled.section`
  display: flex;
  height: 68px;
  align-items: center;
`;
const StyledTextWrapper = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const HomePageHeader = () => {
  return (
    <StyledSection>
      <HomePageIcon />
      <StyledTextWrapper>
        <Typography variant="h1" bold>
          Project Portal
        </Typography>
        <Typography variant="h6" token={{ textTransform: 'uppercase' }}>
          Powered by fusion
        </Typography>
      </StyledTextWrapper>
    </StyledSection>
  );
};
