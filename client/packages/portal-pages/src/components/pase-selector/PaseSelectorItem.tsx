import { Card, Icon } from '@equinor/eds-core-react';
import { useNavigate } from 'react-router-dom';
import {
  StyledCard,
  StyledIconWrapper,
  StyledTypography,
} from './PaseSelectorItem.Styles';

interface SectionSelectorItemProps {
  id: string;
  title: string;
  description: string;
  icon: string | React.FC;
  active?: boolean;
}

export const PaseSelectorItem = ({
  id,
  title,
  description,
  icon,
  active,
}: SectionSelectorItemProps) => {
  const CustomIcon = icon;
  const navigate = useNavigate();

  function handleNavigate() {
    active && navigate(id);
  }

  return (
    <StyledCard active={active} onClick={handleNavigate}>
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
