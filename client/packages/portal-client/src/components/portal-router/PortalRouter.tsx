import { useFramework } from '@equinor/fusion-framework-react';
import { AppLoader } from '@equinor/portal-core';
import { ContextPage, ViewPage } from '@equinor/portal-pages';
import { PortalMessagePage } from '@equinor/portal-ui';
import { NavigationModule } from '@equinor/fusion-framework-module-navigation';
import { useMemo } from 'react';
import { RouteObject, RouterProvider } from 'react-router-dom';

import { PortalFrame } from '../portal-frame/PortalFrame';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <PortalFrame />,
		errorElement: <PortalMessagePage title="Fail to setup portal" type="Error" />,
		children: [
			{
				path: '/',
				element: <ViewPage />,
				errorElement: <PortalMessagePage title="Fail to load view page" type={'Error'} />,
			},
			{
				path: '/context-page/*',
				element: <ContextPage />,
				errorElement: <PortalMessagePage title="Fail to load context page" type={'Error'} />,
			},
			{
				path: `/apps/:appKey/*`,
				element: <AppLoader />,
				errorElement: <PortalMessagePage title="Fail to load application" type={'Error'} />,
			},
		],
	},
];

export function PortalRouter() {
	const { navigation } = useFramework<[NavigationModule]>().modules;

	let router = useMemo(() => navigation.createRouter(routes), []);

	return <RouterProvider router={router} />;
}

export default PortalRouter;
