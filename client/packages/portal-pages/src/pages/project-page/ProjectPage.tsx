import { Typography } from '@equinor/eds-core-react';
import { useFrameworkCurrentContext } from '@equinor/portal-core';
import { WorkAssigned } from '@equinor/portal-ui';
import { Navigate, useParams } from 'react-router-dom';

import { StyledMain } from '../common-styles/Styles';
import { Handover } from './components/kpis/handover/Handover';
import { Milestones } from './components/project-cards/milestones/Milestones';
import { ProjectDetails } from './components/project-cards/ProjectDetails';
import {
	StyledBackground,
	StyledContextPageGrid,
	StyledGridItem,
	StyledHeaderSection,
	StyledCard,
} from './ProjectPage.Styles';

function getBackgroundURL(instCode: string) {
	return `https://stiddata.equinor.com/public/${instCode}.jpg`;
}

type ProjectMaster = {
	facilities: string[];
	projectCategory: string;
	cvpid: string;
	documentManagementId: string;
	phase: string;
	portfolioOrganizationalUnit: string;
} & Record<string, unknown>;

export const ProjectPage = () => {
	const { contextId } = useParams();

	const currentContext = useFrameworkCurrentContext<ProjectMaster>();

	if (
		!currentContext ||
		!contextId?.match(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/)
	) {
		return null;
	}

	if (currentContext.type.id !== 'ProjectMaster') {
		return <Navigate to="/" />;
	}

	return (
		<StyledMain>
			<StyledBackground />
			{currentContext.value.facilities && (
				<StyledHeaderSection url={getBackgroundURL(currentContext.value.facilities[0])}>
					<StyledCard>
						<Typography variant="h3">
							<b>{currentContext?.title}</b>
						</Typography>
						<Typography variant="h3">
							{currentContext.value.projectCategory.replace(new RegExp('-|_/*'), ' ')}
						</Typography>
					</StyledCard>
				</StyledHeaderSection>
			)}
			<StyledContextPageGrid>
				<StyledGridItem span={3} heightSpan={3}>
					<ProjectDetails />
				</StyledGridItem>

				<StyledGridItem span={4} heightSpan={3}>
					<WorkAssigned />
				</StyledGridItem>
				<StyledGridItem span={5}>
					<Milestones />
				</StyledGridItem>
			</StyledContextPageGrid>
		</StyledMain>
	);
};
