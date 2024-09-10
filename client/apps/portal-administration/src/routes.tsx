import { RouteObject } from 'react-router-dom';
import { Portals } from './pages/Portals';
import { EditPortal } from './pages/EditPortal';
import { RouterConfig } from './pages/RouterConfig';
import { Context } from './pages/ContextConfig';
import Portal from './pages/Portal';
import { OnboardedApps } from './pages/OnboardedApps';
import { PortalApps } from './pages/PortalApps';
import { Root } from './pages/Root';
import { ShowConfigPage } from './components/Portal/ShowConfig';

export const routes: RouteObject[] = [
	{
		path: '/',
		Component: Root,
		children: [
			{
				index: true,
				Component: Portals,
			},
			{
				path: 'portals',
				index: true,
				Component: Portals,
			},
			{
				path: 'settings/apps',
				Component: OnboardedApps,
			},
			{
				Component: Context,
				path: 'settings/context',
			},
			{
				path: 'portals/:portalId',
				Component: Portal,
				children: [
					{
						Component: EditPortal,
					},
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
