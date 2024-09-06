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
import { DataClarification } from '../components/DataClarification';

import { InfoPopover } from '../components/InfoPopover';

const Style = {
	Wrapper: styled.div`
		height: 100%;
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
		<Style.Content>
			<Tabs activeTab={activeTab} onChange={onTabChange}>
				<Style.TabsListWrapper>
					<Style.Row>
						<Typography variant="h4">
							{portal ? `${portal.name} - Apps Config` : 'Postal Apps Config'}
						</Typography>
						<InfoPopover title="Portal Apps Config">
							<Typography>Configure the applications that are available in this portal.</Typography>
						</InfoPopover>
					</Style.Row>
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
						</Tabs.List>
					</Style.Row>
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
		</Style.Content>
	);
};
