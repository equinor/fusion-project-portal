import { HeaderStyle } from '../HeaderStyle';
import { TabsList, useTabs } from '../../hooks/use-tabs';
import { Breadcrumbs, Typography, Tabs, Tooltip, Icon } from '@equinor/eds-core-react';
import { edit, apps, tag_relations, settings } from '@equinor/eds-icons';
import { Link } from 'react-router-dom';
import { DataClarification } from '../DataClarification';
import { InfoPopover } from '../InfoPopover';
import { Portal } from '../../types';

const Styles = HeaderStyle;

const tabs: TabsList<'overview' | 'apps' | 'router' | 'show'> = [
	{ key: 'overview', title: 'Overview', route: 'overview', description: 'Overview of the portal' },
	{
		title: 'Apps Config',
		key: 'apps',
		route: 'apps',
		description: 'Configure the applications that are available in this portal.',
	},
	{
		key: 'router',
		title: 'Router Config',
		route: 'router',
		description: () => (
			<div>
				<Typography variant="body_long_bold">Configure the routing for the portal.</Typography>
				<Typography>
					The firs route is the root route for the portal. The root route is the route that is shown when the
					portal is opened.
				</Typography>

				<br />
				<Typography variant="body_long_bold">Routes</Typography>
				<Typography>
					Routes are created by pressing the new route button, and the route is created as a child of the
					selected route. The route can be edited by selecting it, and the route can be removed by pressing
					the delete route button under the contextual menu.
				</Typography>
			</div>
		),
	},
	{
		key: 'show',
		title: 'Portal Config',
		route: 'show',
		description: 'This is a json view of the current portal configuration, it is used by developers only.',
	},
];

export const PortalHeader = ({ portal }: { portal?: Portal }) => {
	const { activeTab } = useTabs(tabs, 'overview');
	return (
		<Styles.TabsListWrapper>
			<Styles.Row>
				<Styles.Breadcrumbs separator={'|'}>
					<Breadcrumbs.Breadcrumb as={Link} to="/portals">
						Portals
					</Breadcrumbs.Breadcrumb>
					<Breadcrumbs.Breadcrumb as={Link} to={`/portals/${portal?.id}/overview`} aria-current="page">
						{portal ? portal.name : 'Portal'}
					</Breadcrumbs.Breadcrumb>
					<Breadcrumbs.Breadcrumb
						as={Link}
						to={`/portals/${portal?.id}/${activeTab.route}`}
						aria-current="page"
					>
						{activeTab.title}
					</Breadcrumbs.Breadcrumb>
				</Styles.Breadcrumbs>
				<InfoPopover title={activeTab.title}>
					{typeof activeTab.description === 'string' ? (
						<Typography>{activeTab.description}</Typography>
					) : (
						<activeTab.description />
					)}
				</InfoPopover>
			</Styles.Row>
			<Styles.Row>
				<DataClarification />
				<Tabs activeTab={activeTab.key}>
					<Tabs.List>
						<Tabs.Tab title="Overview" value={'overview'} as={Link} to={`/portals/${portal?.id}/overview`}>
							<Tooltip title="Overview">
								<Icon data={edit} />
							</Tooltip>
						</Tabs.Tab>
						<Tabs.Tab
							title="Application configuration"
							value={'apps'}
							as={Link}
							to={`/portals/${portal?.id}/apps`}
						>
							<Tooltip title="Application configuration">
								<Icon data={apps} />
							</Tooltip>
						</Tabs.Tab>
						<Tabs.Tab
							title="Router COnfiguration"
							value={'router'}
							as={Link}
							to={`/portals/${portal?.id}/router`}
						>
							<Tooltip title="Router Configuration">
								<Icon data={tag_relations} />
							</Tooltip>
						</Tabs.Tab>
						<Tabs.Tab title="Configuration" value={'show'} as={Link} to={`/portals/${portal?.id}/show`}>
							<Tooltip title="Configuration">
								<Icon data={settings} />
							</Tooltip>
						</Tabs.Tab>
					</Tabs.List>
				</Tabs>
			</Styles.Row>
		</Styles.TabsListWrapper>
	);
};
