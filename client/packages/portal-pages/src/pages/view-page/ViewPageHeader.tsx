import { Icon, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { View } from '@equinor/portal-core';
import { SVGIconFromString } from '@equinor/portal-ui';
import styled from 'styled-components';
import { FusionIcon } from './FusionIcon';

const StyledSection = styled.section`
	display: flex;
	height: 68px;
	align-items: center;
	flex-direction: row;
	@media only screen and (max-width: 45rem) {
		flex-direction: column;
		height: auto;
	}
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
	@media only screen and (max-width: 45rem) {
		align-items: flex-start;
	}
	> svg {
		min-width: 97px;
		min-height: 97px;
	}
	box-shadow: 0px 12px 17px rgba(0, 0, 0, 0.14), 0px 5px 22px rgba(0, 0, 0, 0.12), 0px 7px 8px rgba(0, 0, 0, 0.2);
`;

export const PasePageHeader = ({ name, subtext, icon }: View) => {
	const customIcon = 'place_unknown';
	return (
		<StyledSection>
			{customIcon ? (
				<FusionIcon />
			) : icon ? (
				<StyledIconWrapper>
					<SVGIconFromString blobString={icon} />
				</StyledIconWrapper>
			) : (
				<StyledIconWrapper>
					<Icon name={customIcon} />
				</StyledIconWrapper>
			)}

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
