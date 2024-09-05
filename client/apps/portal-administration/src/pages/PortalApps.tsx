import styled from 'styled-components';

import { Icon, Tabs, Tooltip, Typography } from '@equinor/eds-core-react';
import { useParams } from 'react-router-dom';
import { useOnboardApps } from '../hooks/use-onboard-apps';
import { useGetPortal } from '../hooks/use-portal-query';
import { Loading } from '../components/Loading';
import { PortalAppTable } from '../components/PortalApps/PortalAppTable';
import { view_module, view_list } from '@equinor/eds-icons';
import { useTabs } from '../hooks/use-tabs';
import { PortalAppList } from '../components/PortalApps/PortalAppList';

const Style = {
	Wrapper: styled.div`
		height: 100%;
		width: 100%;
		position: absolute;
	`,
	Content: styled.div`
		width: 100%;
		gap: 1rem;
		padding: 1rem;
		padding-bottom: 0rem;
		position: relative;
	`,
	ActionBar: styled.div`
		padding: 1rem;
		display: flex;
		justify-content: space-between;
	`,
	TabsListWrapper: styled.div`
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 1rem;
		padding-bottom: 0rem;
		align-items: flex-end;
	`,
};

export const PortalApps = () => {
	const { portalId } = useParams();

	const { data: portalApps, isLoading } = useOnboardApps(portalId);
	const { data: portal, isLoading: portalIsLoading } = useGetPortal(portalId);
	const { onTabChange, activeTab } = useTabs(['table', 'list'], 'table');

	if (!portalId) {
		return <>No portalId provided</>;
	}
	if (isLoading || portalIsLoading) {
		return <Loading detail="Loading Portal App Config" />;
	}

	return (
		<>
			<Style.Wrapper>
				<Tabs activeTab={activeTab} onChange={onTabChange}>
					<Style.Content>
						<Typography variant="h4">
							{portal ? `${portal.name} - Apps Config` : 'Postal Apps Config'}
						</Typography>
					</Style.Content>
					<Style.TabsListWrapper>
						<Tabs.List>
							<Tabs.Tab title="Table View">
								<Tooltip title="Table View">
									<Icon data={view_module} />
								</Tooltip>
							</Tabs.Tab>
							<Tabs.Tab title="List View">
								<Tooltip title="List View">
									<Icon data={view_list} />
								</Tooltip>
							</Tabs.Tab>
						</Tabs.List>
					</Style.TabsListWrapper>
					<Tabs.Panels>
						<Tabs.Panel>
							{activeTab === 0 && (
								<Style.Wrapper>
									<PortalAppTable portalApps={portalApps} />
								</Style.Wrapper>
							)}
						</Tabs.Panel>
						<Tabs.Panel>{activeTab === 1 && <PortalAppList portalApps={portalApps} />}</Tabs.Panel>
					</Tabs.Panels>
				</Tabs>
			</Style.Wrapper>
		</>
	);
};
