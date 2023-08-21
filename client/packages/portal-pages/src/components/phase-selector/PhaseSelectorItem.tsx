import { Card, Icon } from '@equinor/eds-core-react';
import { StyledCard, StyledIconWrapper, StyledTypography } from './PhaseSelectorItem.Styles';
import { View } from '@equinor/portal-core';
import { SVGIconFromString } from '@equinor/portal-ui';

type SectionSelectorItemProps = View & { onClick: () => void };

export const PhaseSelectorItem = ({ name, subtext, icon, onClick }: SectionSelectorItemProps) => {
	const CustomIcon = 'place_unknown';

	return (
		<StyledCard active={true} onClick={onClick}>
			<Card.Header>
				<Card.HeaderTitle>
					<StyledTypography variant="h4" token={{ textAlign: 'center', fontWeight: 'bold' }}>
						{name}
					</StyledTypography>
				</Card.HeaderTitle>
			</Card.Header>

			<StyledIconWrapper active={true}>
				{icon ? <SVGIconFromString blobString={icon} /> : <Icon name={CustomIcon} />}
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
