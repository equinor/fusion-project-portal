import { Typography } from '@equinor/eds-core-react';

// import { useCurrentUser } from '@portal/core';
import styled from 'styled-components';
import background from './assets/background.svg';
import { PropsWithChildren } from 'react';

export const StyledBackgroundWrapper = styled.section`
	background-image: url(${background});
	width: 100%;
	height: 100%;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: bottom;
	background-color: #dee5e7;
	display: flex;
	flex-direction: column;
	overflow: hidden;
`;

export const StyledHeader = styled.div`
	padding-top: 5%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	> :not(:first-child) {
		margin-left: 0px;
	}
	margin: 2rem;
`;
export const StyledWrapper = styled.div`
	position: relative;
`;

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

export const ProjectHeader = ({ children }: PropsWithChildren) => {
	const { data } = { data: { name: 'chris' } }; //useCurrentUser();

	return (
		<StyledBackgroundWrapper>
			<StyledHeader>
				<Typography variant="h1">Welcome to Project Portal</Typography>
				<Typography variant="h6">
					{getGreeting()} {data?.name || 'Chris'}
				</Typography>
			</StyledHeader>
			<StyledWrapper>{children}</StyledWrapper>
		</StyledBackgroundWrapper>
	);
};
