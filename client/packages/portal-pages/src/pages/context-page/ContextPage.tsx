import { Typography } from '@equinor/eds-core-react';

import { useFrameworkCurrentContext } from '@equinor/portal-core';
import { WorkAssigned } from '@equinor/portal-ui';
import { StyledMain } from '../common-styles/Styles';
import { AlwaysSafe } from './components/kpis/AlwaysSafe';
import { Handover } from './components/kpis/handover/Handover';
import { LowCarbon } from './components/kpis/LowCarbon';

import { Milestones } from './components/project-cards/milestones/Milestones';
import { ProjectDescription } from './components/project-cards/ProjectDescription';
import { ProjectDetails } from './components/project-cards/ProjectDetails';

import {
	StyledBackground,
	StyledContextPageGrid,
	StyledGridItem,
	StyledHeaderSection,
	StyledCard,
} from './ContextPage.Styles';

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

export const ContextPage = () => {
	const currentContext = useFrameworkCurrentContext<ProjectMaster>();

	if (!currentContext) return null;

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

				<StyledGridItem span={5}>
					<Handover />
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
