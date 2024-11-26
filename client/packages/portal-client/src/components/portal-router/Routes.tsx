import { PortalMessagePage } from '@equinor/portal-ui';
import { Navigate, RouteObject } from 'react-router-dom';

import { PortalFrame } from '../portal-frame/PortalFrame';
import { AppPage } from '../../pages/AppPage/AppPage';
import { PortalRouter } from '@portal/core';
import { PortalPage } from './PortalPage';
import { getConfiguredRoutes } from './GetConfiguredRoutes';

/**
 * Generates the route configuration for the portal application.
 *
 * @param {PortalRouter} portalRoutes - The portal router configuration object.
 * @returns {RouteObject[]} An array of route objects for the portal application.
 *
 * The generated routes include:
 * - The root path (`/`) which renders the `PortalFrame` component and handles errors with `PortalMessagePage`.
 * - The root page (`/`) which renders the `PortalPage` component with the root route configuration.
 * - Additional configured pages from `getConfiguredRoutes`.
 * - An application path (`/apps/:appKey`) which renders the `AppPage` component and handles nested routes and errors.
 * - A redirect path (`/aka/*`) which navigates to the corresponding application path.
 * - A wildcard path (`/*`) which redirects to the root path.
 */
export const getRoutes = (portalRoutes: PortalRouter): RouteObject[] => {
	// Generate the route configuration for the portal application2.
	const pages = getConfiguredRoutes(portalRoutes.routes);

	return [
		{
			path: '/',
			element: <PortalFrame />,
			errorElement: <PortalMessagePage title="Fail to setup portal" type="Error" />,
			children: [
				{
					path: '/',
					element: <PortalPage route={{ ...portalRoutes?.root, path: '' }} />,
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
