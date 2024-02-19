import { useFramework } from '@equinor/fusion-framework-react';

import { PortalMessagePage, PortalProgressLoader } from '@equinor/portal-ui';
import { NavigationModule } from '@equinor/fusion-framework-module-navigation';
import { useMemo } from 'react';
import { Navigate, RouteObject, RouterProvider } from 'react-router-dom';

import { PortalFrame } from '../portal-frame/PortalFrame';
import { AppPage } from '../../pages/AppPage/AppPage';
import { PortalRoutes, usePortalConfig } from '@portal/core';
import { PortalPage } from './PortalPage';
import PeopleResolverProvider from '@equinor/fusion-framework-react-components-people-provider';

const routes = (portalRoutes: PortalRoutes | undefined): RouteObject[] => {
	const pages =
		portalRoutes?.routes?.map((route) => ({
			path: route.path,
			element: <PortalPage route={route} />,
			errorElement: (
				<PortalMessagePage title={route.messages?.errorMessage || 'Fail to load page'} type={'Error'} />
			),
			children: route.children?.map((childRoute) => ({
				path: childRoute.path,
				element: <PortalPage route={childRoute} />,
				errorElement: (
					<PortalMessagePage
						title={childRoute.messages?.errorMessage || 'Fail to load page'}
						type={'Error'}
					/>
				),
			})),
		})) || [];

	return [
		{
			path: '/',
			element: <PortalFrame />,
			errorElement: <PortalMessagePage title="Fail to setup portal" type="Error" />,
			children: [
				{
					path: '/',
					element: <PortalPage route={portalRoutes?.root} />,
					errorElement: <PortalMessagePage title="Fail to load view page" type={'Error'} />,
				},
				{
					path: '/apps/:appKey',
					element: <AppPage />,
					children: [
						{
							path: ':contextId/*',
							element: <AppPage />,
							errorElement: <PortalMessagePage title="Fail to load application" type={'Error'} />,
						},
					],
					errorElement: <PortalMessagePage title="Fail to load application" type={'Error'} />,
				},
				...pages,
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
};

function PortalRouter({ routes }: { routes: RouteObject[] }) {
	const { navigation } = useFramework<[NavigationModule]>().modules;
	const router = useMemo(() => navigation.createRouter(routes), []);
	return <RouterProvider router={router} />;
}

export function PortalProvider() {
	const { data, isLoading } = usePortalConfig().query;

	if (isLoading) {
		return <PortalProgressLoader title="Loading Portal Routes" />;
	}

	return (
		<PeopleResolverProvider>
			{data?.routes ? <PortalRouter routes={routes(data.routes)} /> : <h1>hello</h1>}
		</PeopleResolverProvider>
	);
}

export default PortalProvider;
