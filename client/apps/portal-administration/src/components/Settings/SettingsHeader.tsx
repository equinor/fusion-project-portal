import { Breadcrumbs, Typography, Tabs, Tooltip, Icon } from '@equinor/eds-core-react';
import { apps, add, view_list, edit, tag } from '@equinor/eds-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TabsList, useTabs } from '../../hooks/use-tabs';
import { DataClarification } from '../DataClarification';
import { HeaderStyle } from '../HeaderStyle';
import { InfoPopover } from '../InfoPopover';
import { Message } from '../Message';

const tabs: TabsList<'apps' | 'app' | 'add' | 'types' | 'contexts'> = [
	{
		title: 'Onboarded Apps',
		key: 'apps',
		route: '/settings/apps',

		icon: apps,
		description: 'Configure the applications that are available in this portal.',
	},

	{
		key: 'contexts',
		icon: view_list,
		title: 'Contexts',
		route: '/settings/contexts',

		description: () => (
			<Message>
				<Typography>To be able to make a app context specific the system needs to add the context</Typography>
				<Typography>Search for the context that is missing</Typography>
				<Typography>Press add to alow for the context tu be utilized</Typography>
				Use the context type filter to specify your search
			</Message>
		),
	},
	{
		key: 'types',
		icon: tag,
		title: 'Context Types',
		route: '/settings/contexts/types',
		description: () => (
			<Message>
				<Typography>If the desired context type is not available, you can add it here.</Typography>
				<Typography>Please note that only valid fusion context types are permitted.</Typography>
			</Message>
		),
	},
];

const Styles = {
	...HeaderStyle,
	Content: styled.div`
		display: flex;
		width: 100%;
		height: inherit;
	`,
	Section: styled.section`
		flex-direction: column;
		padding: 1rem;
		display: flex;
		height: inherit;
	`,
	Wrapper: styled.div`
		display: block;
		overflow: hidden;
		height: 100%;
	`,
};

export const SettingsHeader = () => {
	const { activeTab } = useTabs(tabs, 'apps');
	return (
		<Styles.TabsListWrapper>
			<Styles.Row>
				<Styles.Breadcrumbs separator={'|'}>
					<Breadcrumbs.Breadcrumb as={Link} to="/settings/apps">
						Settings
					</Breadcrumbs.Breadcrumb>

					<Breadcrumbs.Breadcrumb as={Link} to={activeTab.route} aria-current="page">
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
						{tabs.map((tab) => (
							<Tabs.Tab title={tab.title} value={tab.key} as={Link} to={tab.route}>
								<Tooltip title={tab.title}>
									<Icon data={tab.icon || view_list} />
								</Tooltip>
							</Tabs.Tab>
						))}
					</Tabs.List>
				</Tabs>
			</Styles.Row>
		</Styles.TabsListWrapper>
	);
};
