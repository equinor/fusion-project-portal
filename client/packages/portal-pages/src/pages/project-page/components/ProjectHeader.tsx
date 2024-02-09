import { Typography } from '@equinor/eds-core-react';

import { useFrameworkCurrentContext } from '@equinor/portal-core';

import { css } from '@emotion/css';

import { useCurrentUser } from '@portal/core';
import styled from 'styled-components';

import { ProjectDetails } from './ProjectDetails';
import { WizardScrim } from './project-wizard/Wizard';

export type ProjectMaster = {
	facilities: string[];
	projectCategory: string;
	cvpid: string;
	documentManagementId: string;
	phase: string;
	portfolioOrganizationalUnit: string;
} & Record<string, unknown>;

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
const styles = {
	headerTitle: css`
		margin: 2rem;
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

export const ProjectHeader = () => {
	const currentContext = useFrameworkCurrentContext<ProjectMaster>();
	const { data } = useCurrentUser();

	return (
		<StyledBackgroundWrapper imageURL={getBackgroundURL(currentContext?.value?.facilities[0])}>
			<StyledHeader className={styles.headerTitle}>
				<Typography variant="h1">{currentContext?.title}</Typography>
				<Typography variant="h6">
					{getGreeting()} {data?.name}
				</Typography>
				<ProjectDetails />
				<WizardScrim />
			</StyledHeader>
		</StyledBackgroundWrapper>
	);
};
