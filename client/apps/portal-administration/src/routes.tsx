import { Navigate, RouteObject } from 'react-router-dom';
import { Portals } from './pages/Portals';
import { EditPortal } from './pages/EditPortal';
import { RouterConfig } from './pages/RouterConfig';
import { Context } from './pages/ContextConfig';
import Portal from './pages/Portal';
import { Settings } from './pages/Settings';
import { PortalApps } from './pages/PortalApps';
import { Root } from './pages/Root';
import { ShowConfigPage } from './components/Portal/ShowConfig';
import { PortalList } from './pages/PortalsList';
import { CreatePortal } from './pages/CreatePortal';

import { OnboardedApps } from './pages/OnboardedAppsTable';

import { ContextTypesPage } from './pages/ContextTypesPage';

export const routes: RouteObject[] = [
	{
		path: '/',
		Component: Root,
		children: [
			{
				index: true,
				Component: () => <Navigate to="/portals" />,
			},
			{
				path: 'settings/apps',
				Component: Settings,
				children: [
					{
						index: true,
						Component: OnboardedApps,
					},
				],
			},
			{
				Component: Settings,
				path: 'settings/contexts',
				children: [
					{
						index: true,
						Component: Context,
					},
					{
						path: 'types',
						Component: ContextTypesPage,
					},
				],
			},
			{
				path: 'portals',
				Component: Portals,
				children: [
					{
						index: true,
						Component: PortalList,
					},
					{
						path: 'create',
						Component: CreatePortal,
					},
				],
			},
			{
				path: 'portals/:portalId',
				Component: Portal,
				children: [
					{
						path: 'overview',
						Component: EditPortal,
					},
					{
						Component: RouterConfig,
						path: 'router',
					},
					{
						Component: PortalApps,
						path: 'apps',
					},
					{
						Component: Context,
						path: 'context',
					},
					{
						Component: ShowConfigPage,
						path: 'show',
					},
				],
			},
		],
	},
];

export default routes;
