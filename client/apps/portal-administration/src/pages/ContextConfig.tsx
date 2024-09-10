import { Header } from '../components/Header';
import styled from 'styled-components';
import { OnboardedContextsList } from '../components/OnboardedContexts/OnboardedContextsList';
import { OnboardedContextsTable } from '../components/OnboardedContexts/OnboardedContextsTable';
import { Icon, Tabs, Tooltip } from '@equinor/eds-core-react';
import { add, settings, view_list, view_module } from '@equinor/eds-icons';
import { AddContext } from '../components/OnboardedContexts/AddContext';
import { Loading } from '../components/Loading';
import { useOnboardedContexts } from '../hooks/use-onboarded-context';
import { useTabs } from '../hooks/use-tabs';
import { EditContextTypeForm } from '../components/OnboardedContexts/ContextType';

const Style = {
	Content: styled.div`
		padding: 0 1rem;
		margin-bottom: 1rem;
	`,
	TabsListWrapper: styled.div`
		display: flex;
		justify-content: right;
		align-items: center;
		padding: 1rem;
		padding-bottom: 0px;
		align-items: flex-end;
	`,
};

export const Context = () => {
	const { onTabChange, activeTab } = useTabs(['new', 'list', 'table', 'settings'], 'new');

	const { isLoading, data: onboardedContexts } = useOnboardedContexts();

	if (isLoading) return <Loading detail="Loading Onboarded Contexts" />;

	return (
		<>
			<Header title="Contexts" />

			<Tabs activeTab={activeTab} onChange={onTabChange}>
				<Style.TabsListWrapper>
					<Tabs.List>
						<Tabs.Tab title="Add New Context">
							<Tooltip title="Add New Context">
								<Icon data={add}></Icon>
							</Tooltip>
						</Tabs.Tab>
						<Tabs.Tab title="List View">
							<Tooltip title="List View">
								<Icon data={view_module} />
							</Tooltip>
						</Tabs.Tab>
						<Tabs.Tab title="Table View">
							<Tooltip title="Table View">
								<Icon data={view_list} />
							</Tooltip>
						</Tabs.Tab>
						<Tabs.Tab title="Settings">
							<Tooltip title="Settings">
								<Icon data={settings}></Icon>
							</Tooltip>
						</Tabs.Tab>
					</Tabs.List>
				</Style.TabsListWrapper>
				<Tabs.Panels>
					<Tabs.Panel>
						<Style.Content>
							<AddContext />
						</Style.Content>
					</Tabs.Panel>
					<Tabs.Panel>
						<Style.Content>
							<OnboardedContextsList onboardedContexts={onboardedContexts} />
						</Style.Content>
					</Tabs.Panel>
					<Tabs.Panel>
						<Style.Content>
							<OnboardedContextsTable onboardedContexts={onboardedContexts} />
						</Style.Content>
					</Tabs.Panel>
					<Tabs.Panel>
						<Style.Content>
							<EditContextTypeForm />
						</Style.Content>
					</Tabs.Panel>
				</Tabs.Panels>
			</Tabs>
		</>
	);
};
