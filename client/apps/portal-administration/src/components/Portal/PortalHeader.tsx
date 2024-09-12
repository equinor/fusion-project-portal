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
	{ key: 'router', title: 'Router Config', route: 'router', description: 'Router Configuration' },
	{ key: 'show', title: 'Config', route: 'show', description: 'Configuration' },
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
					<Typography>{activeTab.description}</Typography>
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
