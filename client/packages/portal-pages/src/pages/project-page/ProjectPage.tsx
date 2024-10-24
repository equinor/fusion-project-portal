import { useFrameworkCurrentContext } from '@equinor/portal-core';

import { useParams, useSearchParams } from 'react-router-dom';

import { OneEquinorLink } from './components/one-equinor-link/OneEquinorLink';
import { ProjectDirector } from './components/project-director/ProjectDirector';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { User } from '../sheared/components/user/UserCard';

import { InfoBox } from '../sheared/components/InfoBox/InfoBox';

import { ConstructionAndCommissioningData } from './ConstructionAndCommissioningData';
import { Overview } from './Overview';
import { AllApps } from '../sheared/components/AllApps';
import { useEffect, useState } from 'react';
import { Tabs } from '@equinor/eds-core-react';
import { useFrameworkFeature } from '@equinor/fusion-framework-react/feature-flag';
import { ProOrgLink } from './components/pro-org-link/ProOrgLink';
import { WizardScrim } from './components/project-wizard/Wizard';
import { ProjectMaster } from '../sheared/types';
import { PageHeader } from '../sheared/components/header/Header';
import { ProjectDetails } from './components/ProjectDetails';
import { assignment } from '@equinor/eds-icons';
import { useNavigateOnContextChange } from '../sheared/hooks/useNavigateOnContextChange';

export const Styles = {
	Wrapper: styled.main`
		display: flex;
		flex-direction: column;
		background: ${tokens.colors.ui.background__light.hex};
		overflow: hidden;
	`,
	Content: styled.section`
		flex: 1;
		overflow: auto;
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
		gap: ${tokens.spacings.comfortable.large};
		padding: 1rem 2rem;
		width: calc(100vw - 490px);
		@media only screen and (max-width: 1300px) {
			flex-direction: column;
		}
	`,
	Row: styled.div`
		display: flex;
		flex-direction: row;
		gap: ${tokens.spacings.comfortable.large};

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
	Relative: styled.div`
		position: relative;
	`,
};

const SEARCH_PARM_TAB = 'tab';

export const ProjectPage = () => {
	const { contextId } = useParams();
	useNavigateOnContextChange();
	const [searchParams, setSearchparams] = useSearchParams();

	const { feature } = useFrameworkFeature('cc-tab');

	const TABS: Record<string, number> = feature?.enabled
		? ({
				overview: 0,
				'construction-and-commissioning': 1,
				'all-apps': 2,
		  } as const)
		: {
				overview: 0,
				'all-apps': 1,
		  };

	useEffect(() => {
		const tab = searchParams.get(SEARCH_PARM_TAB);
		if (tab) {
			setActiveTab(TABS[tab]);
		} else {
			handleChange(0);
		}
	}, []);

	const [activeTab, setActiveTab] = useState(0);

	const handleChange = (index: number) => {
		setActiveTab(index);
		setSearchparams({ [SEARCH_PARM_TAB]: Object.keys(TABS)[index] });
	};

	const currentContext = useFrameworkCurrentContext<ProjectMaster>();

	if (
		!currentContext ||
		!contextId?.match(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/)
	) {
		return null;
	}

	return (
		<Styles.Wrapper>
			<WizardScrim />
			<Styles.Content>
				<Styles.Relative>
					<Styles.Details>
						<User />
						<ProjectDirector />
						<InfoBox />
						<OneEquinorLink />
						<ProOrgLink />
					</Styles.Details>
				</Styles.Relative>
				<PageHeader<ProjectMaster>
					icon={assignment}
					contextImageResolver={(context) => {
						return context?.value?.facilities && context.value.facilities.length > 0
							? context?.value?.facilities[0]
							: '';
					}}
				>
					<ProjectDetails />
				</PageHeader>
				<Styles.TabsWrapper>
					<Tabs activeTab={activeTab} onChange={handleChange}>
						{feature?.enabled ? (
							<Tabs.List>
								<Tabs.Tab>Overview</Tabs.Tab>
								<Tabs.Tab>Construction and Commissioning</Tabs.Tab>
								<Tabs.Tab>All Apps</Tabs.Tab>
							</Tabs.List>
						) : (
							<Tabs.List>
								<Tabs.Tab>Overview</Tabs.Tab>
								<Tabs.Tab>All Apps</Tabs.Tab>
							</Tabs.List>
						)}

						{feature?.enabled ? (
							<Tabs.Panels>
								<Tabs.Panel>
									<Overview openAllApps={() => handleChange(2)} />
								</Tabs.Panel>
								<Tabs.Panel>
									<ConstructionAndCommissioningData />
								</Tabs.Panel>
								<Tabs.Panel>
									<AllApps />
								</Tabs.Panel>
							</Tabs.Panels>
						) : (
							<Tabs.Panels>
								<Tabs.Panel>
									<Overview openAllApps={() => handleChange(1)} />
								</Tabs.Panel>
								<Tabs.Panel>
									<AllApps />
								</Tabs.Panel>
							</Tabs.Panels>
						)}
					</Tabs>
				</Styles.TabsWrapper>
			</Styles.Content>
		</Styles.Wrapper>
	);
};
