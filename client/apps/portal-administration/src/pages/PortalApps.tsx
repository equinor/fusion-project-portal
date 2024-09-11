import styled from 'styled-components';

import { Breadcrumbs, Icon, Tabs, Tooltip, Typography } from '@equinor/eds-core-react';
import { Link, useParams } from 'react-router-dom';
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
		height: calc(100% - 6rem);
		width: 100%;
		position: absolute;
	`,
	Content: styled.div`
		padding: 1rem;
		width: -webkit-fill-available;
		height: -webkit-fill-available;
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
		height: 45px;
	`,
	Tab: styled(Tabs.Tab)`
		${({ active }) => (!active ? 'border-bottom-color: transparent;' : '')};
		border-bottom-width: 2px;
	`,
	Row: styled.div`
		display: flex;
		align-items: center;
	`,
	Breadcrumbs: styled(Breadcrumbs)`
		> * > li > * {
			overflow: visible;
			font-size: 1.25em;
		}
	`,
};

export const PortalApps = () => {
	const { portalId } = useParams();

	const { data: portalApps, isLoading } = useOnboardApps(portalId);
	const { data: portal } = useGetPortal(portalId);
	const { onTabChange, activeTab } = useTabs(['table', 'list'], 'table');

	if (!portalId) {
		return <>No portalId provided</>;
	}

	return (
		<Style.Content>
			<Tabs activeTab={activeTab} onChange={onTabChange}>
				<Style.TabsListWrapper>
					<Style.Row>
						<Style.Breadcrumbs separator={'|'}>
							<Breadcrumbs.Breadcrumb as={Link} to="/portals">
								Portals
							</Breadcrumbs.Breadcrumb>
							<Breadcrumbs.Breadcrumb
								as={Link}
								to={`/portals/${portal?.id}/overview`}
								aria-current="page"
							>
								{portal ? portal.name : 'Portal'}
							</Breadcrumbs.Breadcrumb>
							<Breadcrumbs.Breadcrumb as={Link} to={`/portals/${portal?.id}/apps`} aria-current="page">
								Apps Config
							</Breadcrumbs.Breadcrumb>
						</Style.Breadcrumbs>
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
				{isLoading ? (
					<Style.Wrapper>
						<Loading detail="Loading Portal App Config" />
					</Style.Wrapper>
				) : (
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
				)}
			</Tabs>
		</Style.Content>
	);
};
