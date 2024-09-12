import { Breadcrumbs, Typography, Tabs, Tooltip, Icon } from '@equinor/eds-core-react';
import { view_list, add } from '@equinor/eds-icons';
import { Link } from 'react-router-dom';
import { TabsList, useTabs } from '../../hooks/use-tabs';
import { DataClarification } from '../DataClarification';
import { HeaderStyle } from '../HeaderStyle';
import { InfoPopover } from '../InfoPopover';

const Styles = HeaderStyle;

const tabs: TabsList<'portals' | 'create'> = [
	{
		title: 'Portal List',
		key: 'portals',
		route: '/portals',

		icon: view_list,
		description: `Portals are the main entry point for users to access the applications. They can be
							configured with a set of applications and routes.`,
	},
	{
		title: 'Create New Portal',
		key: 'create',
		route: '/portals/create',
		icon: add,
		description: 'Create a new portal to manage applications and routes.',
	},
];

export const PortalsHeader = () => {
	const { activeTab } = useTabs(tabs, 'portals');

	return (
		<Styles.TabsListWrapper>
			<Styles.Row>
				<Styles.Breadcrumbs separator={'|'}>
					<Breadcrumbs.Breadcrumb as={Link} to="/portals">
						Portals
					</Breadcrumbs.Breadcrumb>
					{activeTab.key === 'create' && (
						<Breadcrumbs.Breadcrumb as={Link} to={activeTab.route} aria-current="page">
							Create
						</Breadcrumbs.Breadcrumb>
					)}
				</Styles.Breadcrumbs>
				<InfoPopover title={activeTab.title}>
					<Typography>{activeTab.description}</Typography>
				</InfoPopover>
			</Styles.Row>
			<Styles.Row>
				<DataClarification />
				<Tabs activeTab={activeTab.key}>
					<Tabs.List>
						{tabs.map((tab) => (
							<Tabs.Tab title={tab.title} value={tab.key} as={Link} to={tab.route}>
								<Tooltip title={tab.title}>
									<Icon data={tab.icon || add} />
								</Tooltip>
							</Tabs.Tab>
						))}
					</Tabs.List>
				</Tabs>
			</Styles.Row>
		</Styles.TabsListWrapper>
	);
};
