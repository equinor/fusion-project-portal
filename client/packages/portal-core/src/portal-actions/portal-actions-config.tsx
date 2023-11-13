import { Bookmarks, FullscreenIcon, Notification, Task } from '@equinor/portal-ui';
import { MyAccount, ServiceNowSideSheet, HelpMenu, Help } from '@portal/components';
import { ServiceMessageIcon, ServiceMessages, ServiceMessageTooltip } from '@equinor/service-message';
import { NotificationBell } from '@equinor/notification';
import { PortalAction } from './types';
import { handleFullscreenClick } from './utils';

export const actions: PortalAction[] = [
	{
		actionId: 'full-screen',
		name: 'Full screen',
		icon: { component: FullscreenIcon, name: 'fullscreen' },
		appendDivider: true,
		onClick: handleFullscreenClick,
		topParOnly: true,
	},
	{
		actionId: 'my-account',
		name: 'My Account',
		color: '#258800',
		icon: 'account_circle',
		component: MyAccount,
		dropDownOnly: true,
	},
	{
		actionId: 'bookmarks',
		name: 'Bookmarks',
		subTitle: 'Application bookmarks',
		color: '#258800',
		icon: 'bookmarks',
		component: Bookmarks,
	},
	{
		actionId: 'task',
		name: 'Work Assigned',
		subTitle: 'Your application related task',
		color: '#258800',
		icon: 'view_list',
		component: Task,
	},
	{
		actionId: 'notifications',
		name: 'Notifications',
		subTitle: 'Portal notifications center',
		color: '#258800',
		icon: { component: NotificationBell, name: 'notifications' },
		component: Notification,
	},
	{
		actionId: 'service-message',
		name: 'Service message',
		subTitle: 'Showing whether the system is working as expected',
		color: '#258800',
		tooltip: <ServiceMessageTooltip />,
		icon: { component: ServiceMessageIcon, name: 'comment_chat' },
		component: ServiceMessages,
	},
	{
		actionId: 'help-menu',
		name: 'Help Menu',
		button: HelpMenu,
	},
	{
		actionId: 'help',
		name: 'Help',
		subTitle: 'Project portal help center',
		component: Help,
	},
	{
		actionId: 'services',
		name: 'Services@Equinor',
		subTitle: 'Equinor self service',
		color: '#258800',
		component: ServiceNowSideSheet,
	},
];
