import { useFrameworkCurrentContext } from '@equinor/portal-core';
import { WorkAssigned } from '@equinor/portal-ui';
import { Navigate, useParams } from 'react-router-dom';

import { Milestones } from './components/project-cards/milestones/Milestones';

import { Favorites } from './components/favorites/Favorites';
import { Contracts } from './components/project-cards/contracts/Contracts';

import { OneEquinorLink } from './components/one-equinor-link/OneEquinorLink';
import { Phases, ProjectDirector } from './components/project-director/ProjectDirector';
import { ProjectHeader } from './components/ProjectHeader';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { User } from './components/user/UserCard';

import FusionInfoBox from './components/Info';
import { StyledGridItem } from './ProjectPage.Styles';

type ProjectMaster = {
	facilities: string[];
	projectCategory: string;
	cvpid: string;
	documentManagementId: string;
	phase: string;
	portfolioOrganizationalUnit: string;
} & Record<string, unknown>;

const Styles = {
	Wrapper: styled.main`
		display: flex;
		flex-direction: column;

		background: ${tokens.colors.ui.background__light.hex};
	`,
	Content: styled.section`
		overflow: auto;
		flex: 1;
	`,

	Details: styled.div`
		position: absolute;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		right: 3rem;
		top: 5rem;
		z-index: 1;
	`,
	// PageGrid: styled.div`
	// 	display: grid;
	// 	gap: 1.5rem;
	// 	padding: 2rem;
	// 	width: calc(100% - 480px);
	// 	grid-template-rows: 1fr;
	// 	@media only screen and (min-width: 45rem) and (max-width: 80rem) {
	// 		grid-template-columns: repeat(4, 1fr);
	// 	}
	// 	@media only screen and (min-width: 80rem) {
	// 		grid-template-columns: repeat(8, 1fr);
	// 	}
	// `,
	Row: styled.div`
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		padding: 2rem;
		width: calc(100vw - 490px);
	`,
	Col: styled.div`
		gap: 1.5rem;
		display: flex;
		flex: 1;
		flex-direction: column;
		width: 50%;
	`,
};

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
		<Styles.Wrapper>
			<ProjectHeader />
			<Styles.Details>
				<User />
				<ProjectDirector />
				<FusionInfoBox />
				<OneEquinorLink />
			</Styles.Details>

			<Styles.Content>
				<Styles.Row>
					<Styles.Col>
						<WorkAssigned />
					</Styles.Col>
					<Styles.Col>
						<StyledGridItem span={4}>
							<Phases />
						</StyledGridItem>
						<StyledGridItem span={4}>
							<Favorites />
						</StyledGridItem>
						<StyledGridItem span={4}>
							<Milestones />
						</StyledGridItem>
						<StyledGridItem span={4}>
							<Contracts />
						</StyledGridItem>
					</Styles.Col>
				</Styles.Row>
			</Styles.Content>
		</Styles.Wrapper>
	);
};
