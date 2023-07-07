import { useFramework } from '@equinor/fusion-framework-react';
import { AppLoader } from '@equinor/portal-core';
import { ProjectPage, ViewPage } from '@equinor/portal-pages';
import { PortalMessagePage } from '@equinor/portal-ui';
import { NavigationModule } from '@equinor/fusion-framework-module-navigation';
import { useMemo } from 'react';
import { Navigate, RouteObject, RouterProvider } from 'react-router-dom';

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
				path: '/project',
				element: <ViewPage />,
				errorElement: <PortalMessagePage title="Fail to load view page" type={'Error'} />,
			},
			{
				path: '/project/:contextId',
				element: <ProjectPage />,
				errorElement: <PortalMessagePage title="Fail to load context page" type={'Error'} />,
			},
			{
				path: '/apps/:appKey',
				element: <AppLoader />,
				children: [
					{
						path: ':contextId/*',
						element: <AppLoader />,
						errorElement: <PortalMessagePage title="Fail to load application" type={'Error'} />,
					},
				],
				errorElement: <PortalMessagePage title="Fail to load application" type={'Error'} />,
			},
			{
				path: `/aka/*`,
				element: <Navigate replace to={window.location.pathname.replace('aka', 'apps')} />,
				errorElement: <PortalMessagePage title="Fail to load application" type={'Error'} />,
			},
			{
				path: `/*`,
				element: <Navigate replace to={'/'} />,
				errorElement: <PortalMessagePage title="Fail to load application" type={'Error'} />,
			},
		],
	},
];

export function PortalRouter() {
	const { navigation } = useFramework<[NavigationModule]>().modules;

	const router = useMemo(() => navigation.createRouter(routes), []);

	return <RouterProvider router={router} />;
}

export default PortalRouter;
