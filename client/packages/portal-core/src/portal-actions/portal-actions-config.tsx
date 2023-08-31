import { Bookmarks, FullscreenIcon, Notification, Task } from '@equinor/portal-ui';

import { ServiceMessageIcon, ServiceMessages, ServiceMessageTooltip } from '@equinor/service-message';
import { NotificationBell } from '@equinor/notification';
import { PortalAction } from './types';
import { handleFullscreenClick } from './utils';
import { Admin, AdminButton } from '../admin';

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
		actionId: 'portal-admin',
		name: 'Portal Admin',
		icon: 'settings',
		component: Admin,
		admin: true,
	},
	// {
	// 	actionId: 'my-account',
	// 	name: 'My Account',
	// 	color: '#258800',
	// 	icon: 'account_circle',
	// 	component: MyAccount,
	// 	dropDownOnly: true,
	// },
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
	// {
	// 	actionId: 'help',
	// 	name: 'Help / Service now',
	// 	icon: 'help_outline',
	// 	subTitle: 'Portal help center',
	// 	component: Help,
	// },
];
