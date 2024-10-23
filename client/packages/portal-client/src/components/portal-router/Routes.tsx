import { PortalMessagePage } from '@equinor/portal-ui';
import { Navigate, RouteObject } from 'react-router-dom';

import { PortalFrame } from '../portal-frame/PortalFrame';
import { AppPage } from '../../pages/AppPage/AppPage';
import { PortalRouter } from '@portal/core';
import { PortalPage } from './PortalPage';
import { getConfiguredRoutes } from './GetConfiguredRoutes';

export const getRoutes = (portalRoutes: PortalRouter): RouteObject[] => {
	const pages = getConfiguredRoutes(portalRoutes.routes);

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
				...pages,
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
