import { useFrameworkCurrentContext } from '@equinor/portal-core';
import { WorkAssigned } from '@equinor/portal-ui';
import { Navigate, useParams } from 'react-router-dom';

import { StyledMain } from '../common-styles/Styles';
import { Milestones } from './components/project-cards/milestones/Milestones';
import { ProjectDetails } from './components/project-cards/ProjectDetails';
import { StyledBackground, StyledContextPageGrid, StyledGridItem } from './ProjectPage.Styles';
import { Favorites } from './components/favorites/Favorites';
import { Contracts } from './components/project-cards/contracts/Contracts';
import { ProjectDirector } from '@portal/components';

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
			<StyledContextPageGrid>
				<StyledGridItem span={9}>
					<ProjectDetails />
				</StyledGridItem>

				<StyledGridItem span={3} heightSpan={3}>
					<WorkAssigned />
				</StyledGridItem>
				<StyledGridItem span={3} heightSpan={2}>
					<Favorites />
				</StyledGridItem>
				<StyledGridItem span={3} heightSpan={1}>
					<ProjectDirector />
				</StyledGridItem>
				<StyledGridItem span={3} heightSpan={1}>
					<Milestones />
				</StyledGridItem>
				<StyledGridItem span={3}>
					<Milestones />
				</StyledGridItem>
				<StyledGridItem span={3}>
					<Contracts />
				</StyledGridItem>
			</StyledContextPageGrid>
		</StyledMain>
	);
};
