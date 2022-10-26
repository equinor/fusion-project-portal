import { Card, Icon } from '@equinor/eds-core-react';
import {
  StyledCard,
  StyledIconWrapper,
  StyledTypography,
} from './PhaseSelectorItem.Styles';
import { Phase } from '@equinor/portal-core';

type SectionSelectorItemProps = Phase & { onClick: () => void };

export const PhaseSelectorItem = ({
  id,
  appGroups,
  name,
  order,
  shortName,
  subtext,
  onClick,
}: SectionSelectorItemProps) => {
  const CustomIcon = 'place_unknown';

  return (
    <StyledCard active={true} onClick={onClick}>
      <Card.Header>
        <Card.HeaderTitle>
          <StyledTypography
            variant="h4"
            token={{ textAlign: 'center', fontWeight: 'bold' }}
          >
            {name}
          </StyledTypography>
        </Card.HeaderTitle>
      </Card.Header>

      <StyledIconWrapper active={true}>
        <Icon name={CustomIcon} />
      </StyledIconWrapper>

      <Card.Actions>
        <StyledTypography
          token={{
            textAlign: 'center',
          }}
        >
          {subtext}
        </StyledTypography>
      </Card.Actions>
    </StyledCard>
  );
};
