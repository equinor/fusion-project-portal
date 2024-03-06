import { Icon, Typography } from '@equinor/eds-core-react';
import { useFrameworkCurrentContext } from '@equinor/portal-core';
import { useCurrentUser } from '@portal/core';
import styled from 'styled-components';
import { FacilityDetails } from './FacilityDetails';
import { Facility } from '../types';
import { platform } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

export const StyledBackgroundWrapper = styled.section<{ imageURL?: string }>`
	background-image: linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.8)),
		url(${({ imageURL }) => imageURL || ''});
	width: 100%;
	height: 180px;
	background-repeat: no-repeat;
	background-size: cover;
	display: flex;
	flex-direction: column;

	overflow: hidden;
`;

export const StyledHeader = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	> :not(:first-child) {
		margin-left: 0px;
	}
`;

function getBackgroundURL(instCode?: string) {
	if (!instCode) return;
	return `https://stiddata.equinor.com/public/${instCode}.jpg`;
}
const Styles = {
	Wrapper: styled.div`
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		> :not(:first-child) {
			margin-left: 0px;
		}
		margin: 2rem;
	`,
	Header: styled.div`
		display: flex;
		gap: 1rem;
		align-items: center;
	`,
};

export const getGreeting = () => {
	const currTime = new Date();
	const currHours = currTime.getHours();

	if (currHours >= 5 && currHours < 12) {
		return 'Good morning';
	} else if (currHours >= 12 && currHours < 17) {
		return 'Good afternoon';
	} else {
		return 'Good evening';
	}
};

export const FacilityHeader = () => {
	const currentContext = useFrameworkCurrentContext<Facility>();
	const { data } = useCurrentUser();

	return (
		<StyledBackgroundWrapper imageURL={getBackgroundURL(currentContext?.value?.identity)}>
			<Styles.Wrapper>
				<Styles.Header>
					<Icon size={48} data={platform} color={tokens.colors.text.static_icons__default.hex} />
					<span>
						<Typography variant="h1">{currentContext?.title}</Typography>
						<Typography variant="h6">
							{getGreeting()} {data?.name}
						</Typography>
					</span>
				</Styles.Header>
				<FacilityDetails />
			</Styles.Wrapper>
		</StyledBackgroundWrapper>
	);
};
