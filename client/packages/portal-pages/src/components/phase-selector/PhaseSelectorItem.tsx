import { Card, Icon } from '@equinor/eds-core-react';
import {
  StyledCard,
  StyledIconWrapper,
  StyledTypography,
} from './PhaseSelectorItem.Styles';

interface SectionSelectorItemProps {
  id: string;
  title: string;
  description: string;
  icon: string | React.FC;
  active?: boolean;
  onClick: () => void;
}

export const PhaseSelectorItem = ({
  id,
  title,
  description,
  icon,
  active,
  onClick,
}: SectionSelectorItemProps) => {
  const CustomIcon = icon;

  return (
    <StyledCard active={active} onClick={onClick}>
      <Card.Header>
        <Card.HeaderTitle>
          <StyledTypography
            variant="h4"
            token={{ textAlign: 'center', fontWeight: 'bold' }}
          >
            {title}
          </StyledTypography>
        </Card.HeaderTitle>
      </Card.Header>

      <StyledIconWrapper active={active}>
        {typeof CustomIcon === 'string' ? (
          <Icon name={CustomIcon} />
        ) : (
          <CustomIcon />
        )}
      </StyledIconWrapper>

      <Card.Actions>
        <StyledTypography
          token={{
            textAlign: 'center',
          }}
        >
          {description}
        </StyledTypography>
      </Card.Actions>
    </StyledCard>
  );
};
