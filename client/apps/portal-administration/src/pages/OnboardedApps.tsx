import { Header } from '../components/Header';
import styled from 'styled-components';
import { Icon, Tabs, Tooltip, Typography } from '@equinor/eds-core-react';
import { add, view_list, view_module } from '@equinor/eds-icons';
import { AppsList } from '../components/OnboardedApps/AppsList';
import { AppsTable } from '../components/OnboardedApps/AppsTable';
import { useTabs } from '../hooks/use-tabs';
import { Message } from '../components/Message';
import { OnboardApp } from '../components/OnboardedApps/OnboardApp';
import { DataClarification } from '../components/DataClarification';
import { Info } from 'luxon';
import { InfoPopover } from '../components/InfoPopover';
import { useOnboardedApps } from '../hooks/use-onboarded-apps';
import { Loading } from '../components/Loading';

const Style = {
	Wrapper: styled.div`
		height: calc(100% - 6rem);
		width: 100%;
		position: absolute;
	`,
	Content: styled.div`
		padding: 1rem;
		width: -webkit-fill-available;
	`,
	ActionBar: styled.div`
		padding: 1rem;
		display: flex;
		justify-content: space-between;
	`,
	TabsListWrapper: styled.div`
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		border-bottom: 2px solid #e0e0e0;
	`,
	Tab: styled(Tabs.Tab)`
		${({ active }) => (!active ? 'border-bottom-color: transparent;' : '')};
		border-bottom-width: 2px;
	`,
	Row: styled.div`
		display: flex;
		align-items: center;
	`,
};

export const OnboardedApps = () => {
	const { data, isLoading } = useOnboardedApps();
	const { onTabChange, activeTab } = useTabs(['table', 'list', 'new'], 'table');
	if (isLoading) return <Loading detail="Loading onboarded apps" />;
	return (
		<Style.Content>
			<Tabs activeTab={activeTab} onChange={onTabChange}>
				<Style.TabsListWrapper>
					<Style.Row>
						<Typography variant="h4">Onboarded Apps</Typography>
						<InfoPopover title="Onboarded Apps">
							<Typography>Onboarded apps are applications that have been activated for use.</Typography>
							<Typography>They can be added to portals.</Typography>
						</InfoPopover>
					</Style.Row>
					<Style.Row>
						<DataClarification />
						<Tabs.List>
							<Style.Tab title="Table View">
								<Tooltip title="Table View">
									<Icon data={view_list} />
								</Tooltip>
							</Style.Tab>
							<Style.Tab title="List View">
								<Tooltip title="List View">
									<Icon data={view_module} />
								</Tooltip>
							</Style.Tab>
							<Style.Tab title="Create New Portal">
								<Tooltip title="Create New Portal">
									<Icon data={add}></Icon>
								</Tooltip>
							</Style.Tab>
						</Tabs.List>
					</Style.Row>
				</Style.TabsListWrapper>
				<Tabs.Panels>
					<Tabs.Panel>
						<Style.Wrapper>{activeTab === 0 && <AppsTable onboardedApps={data} />}</Style.Wrapper>
					</Tabs.Panel>
					<Tabs.Panel>{activeTab === 1 && <AppsList onboardedApps={data} />}</Tabs.Panel>
					<Tabs.Panel>{activeTab === 2 && <OnboardApp />}</Tabs.Panel>
				</Tabs.Panels>
			</Tabs>
		</Style.Content>
	);
};
