import { Icon, Tabs, Tooltip, Typography } from '@equinor/eds-core-react';
import { add, view_list, view_module } from '@equinor/eds-icons';

import styled from 'styled-components';

import { Loading } from '../components/Loading';
import { usePortalsQuery } from '../hooks/use-portals-query';
import { PortalList } from '../components/Portals/PortalList';
import { PortalTable } from '../components/Portals/PortalTable';

import { useTabs } from '../hooks/use-tabs';
import { CreatePortalForm } from '../components/Portals/CreatePortalForm';
import { InfoPopover } from '../components/InfoPopover';
import { DataClarification } from '../components/DataClarification';

const Style = {
	Wrapper: styled.div`
		height: calc(100% - 6rem);
		width: 100%;
		position: absolute;
	`,
	TabsListWrapper: styled.div`
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2px solid #e0e0e0;
	`,
	Content: styled.div`
		padding: 1rem;
		width: -webkit-fill-available;
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

const Title = ({ activeTab }: { activeTab: number }) => {
	return (
		<>
			{activeTab > 1 ? (
				<Style.Row>
					<Typography variant="h4">Create New Portal</Typography>
					<InfoPopover title="Create New Portal">
						<Typography>Create a new portal to manage applications and routes.</Typography>
					</InfoPopover>
				</Style.Row>
			) : (
				<Style.Row>
					<Typography variant="h4">Portals</Typography>
					<InfoPopover title="Portals">
						<Typography>
							Portals are the main entry point for users to access the applications. They can be
							configured with a set of applications and routes.
						</Typography>
					</InfoPopover>
				</Style.Row>
			)}
		</>
	);
};

export const Portals = () => {
	const { isLoading, data: portalsData } = usePortalsQuery();

	const { onTabChange, activeTab } = useTabs(['table', 'list', 'new'], 'table');

	return (
		<Style.Content>
			<Tabs activeTab={activeTab} onChange={onTabChange}>
				<Style.TabsListWrapper>
					<Title activeTab={activeTab} />

					<Style.Row>
						<DataClarification />
						<Tabs.List>
							<Style.Tab title="Table View">
								<Tooltip title="Table View">
									<Icon data={view_module} />
								</Tooltip>
							</Style.Tab>
							<Style.Tab title="List View">
								<Tooltip title="List View">
									<Icon data={view_list} />
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
						{isLoading ? (
							<Style.Wrapper>
								<Loading detail="Loading Portal App Config" />
							</Style.Wrapper>
						) : (
							<Style.Wrapper>
								{activeTab === 0 && <PortalTable portalsData={portalsData} />}
							</Style.Wrapper>
						)}
					</Tabs.Panel>
					<Tabs.Panel>
						{isLoading ? (
							<Style.Wrapper>
								<Loading detail="Loading Portal App Config" />
							</Style.Wrapper>
						) : (
							<div>{activeTab === 1 && <PortalList portalsData={portalsData} />}</div>
						)}
					</Tabs.Panel>
					<Tabs.Panel>{activeTab === 2 && <CreatePortalForm />}</Tabs.Panel>
				</Tabs.Panels>
			</Tabs>
		</Style.Content>
	);
};
