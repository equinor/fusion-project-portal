import { Icon, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { Phase } from '@equinor/portal-core';
import styled from 'styled-components';

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

export const StyledIconWrapper = styled.div<{ active?: boolean }>`
  width: 97px;
  height: 97px;
  display: flex;
  background: ${tokens.colors.ui.background__default.rgba};
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  > svg {
    min-width: 97px;
    min-height: 97px;
  }
  box-shadow: 0px 12px 17px rgba(0, 0, 0, 0.14),
    0px 5px 22px rgba(0, 0, 0, 0.12), 0px 7px 8px rgba(0, 0, 0, 0.2);
`;

interface PasePageHeaderProps {
  id?: string;
  title: string;
  description: string;
  icon: string | React.FC;
}

export const PasePageHeader = ({ name, shortName, subtext }: Phase) => {
  const CustomIcon = 'place_unknown';
  return (
    <StyledSection>
      <StyledIconWrapper>
        <Icon name={CustomIcon} />
      </StyledIconWrapper>

      <StyledTextWrapper>
        <Typography variant="h1" bold>
          {name}
        </Typography>
        <Typography variant="h6" token={{ textTransform: 'uppercase' }}>
          {subtext}
        </Typography>
      </StyledTextWrapper>
    </StyledSection>
  );
};
