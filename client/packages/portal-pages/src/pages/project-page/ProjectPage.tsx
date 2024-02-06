import { useFrameworkCurrentContext } from '@equinor/portal-core';

import { Navigate, useParams } from 'react-router-dom';

import { OneEquinorLink } from './components/one-equinor-link/OneEquinorLink';
import { ProjectDirector } from './components/project-director/ProjectDirector';
import { ProjectHeader } from './components/ProjectHeader';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { User } from './components/user/UserCard';

import FusionInfoBox from './components/info';

import { ExecutionData } from './ExecutionData';
import { Overview } from './Overvirew';
import { AllApps } from './AllApps';
import { useState } from 'react';
import { Tabs } from '@equinor/eds-core-react';

type ProjectMaster = {
	facilities: string[];
	projectCategory: string;
	cvpid: string;
	documentManagementId: string;
	phase: string;
	portfolioOrganizationalUnit: string;
} & Record<string, unknown>;

export const Styles = {
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
		width: 360px;
	`,

	TabsWrapper: styled.div`
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		padding: 1rem 2rem;
		width: calc(100vw - 490px);
		@media only screen and (max-width: 1300px) {
			flex-direction: column;
		}
	`,
	Row: styled.div`
		display: flex;
		flex-direction: row;
		gap: 1.5rem;

		width: calc(100vw - 490px);
		@media only screen and (max-width: 1300px) {
			flex-direction: column;
		}
	`,
	Col: styled.div`
		gap: 1.5rem;
		display: flex;
		flex: 1;
		flex-direction: column;
		width: 50%;
		@media only screen and (max-width: 1300px) {
			width: 100%;
		}
	`,
};

export const ProjectPage = () => {
	const { contextId } = useParams();

	const [activeTab, setActiveTab] = useState(0);

	const handleChange = (index: number) => {
		setActiveTab(index);
	};

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
				<Styles.TabsWrapper>
					<Tabs activeTab={activeTab} onChange={handleChange}>
						<Tabs.List>
							<Tabs.Tab>Overview</Tabs.Tab>
							<Tabs.Tab>Execution Data</Tabs.Tab>
							<Tabs.Tab>All Apps</Tabs.Tab>
						</Tabs.List>
						<Tabs.Panels>
							<Tabs.Panel>
								<Overview />
							</Tabs.Panel>
							<Tabs.Panel>
								<ExecutionData />
							</Tabs.Panel>
							<Tabs.Panel>
								<AllApps />
							</Tabs.Panel>
						</Tabs.Panels>
					</Tabs>
				</Styles.TabsWrapper>
			</Styles.Content>
		</Styles.Wrapper>
	);
};
