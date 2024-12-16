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
import { CreatePortal } from './pages/CreatePortal';

import { OnboardedApps } from './pages/OnboardedAppsTable';

import { ContextTypesPage } from './pages/ContextTypesPage';
import { LandingPage } from './pages/LandingPage';
import { Layout } from './pages/Layout';
import { PortalList } from './pages/PortalsList';
import { CreatePortalForm } from './components/Portals/CreatePortalForm';
import { AdminCreatePortal } from './pages/AdminCreatePortal';
import { GettingStarted } from './pages/GettingStated';
import { ExtensionConfig } from './pages/ExtensionConfig';

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
				path: 'portals',
				Component: LandingPage,
			},
			{
				path: 'getting-started',
				Component: GettingStarted,
			},
			{
				path: 'create',
				Component: CreatePortal,
			},
			{
				path: 'admin/*',
				Component: Portals,
				children: [
					{
						path: 'portals',
						Component: PortalList,
					},
					{
						path: 'create',
						Component: AdminCreatePortal,
					},
				],
			},
			{
				path: 'portals/*',
				Component: Layout,
				children: [
					{
						path: ':portalId',
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
								Component: ExtensionConfig,
								path: 'extensions',
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
			{
				path: 'settings/*',
				Component: Layout,
				children: [
					{
						path: 'apps',
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
						path: 'contexts',
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
				],
			},
		],
	},
];

export default routes;
