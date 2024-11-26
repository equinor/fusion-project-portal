import { PortalMessagePage } from '@equinor/portal-ui';
import { PortalRouteWithChildren } from '@portal/core';
import { PortalPage } from './PortalPage';

/**
 * Generates a configuration of routes for the portal.
 *
 * @param {PortalRouteWithChildren[]} routes - An array of route objects, each potentially containing child routes.
 * @returns {Array} An array of route configurations, each containing path, element, errorElement, and optionally children.
 *
 * Each route configuration includes:
 * - `path`: The path for the route.
 * - `element`: The component to render for the route.
 * - `errorElement`: The component to render in case of an error.
 * - `children`: An array of child route configurations, each with its own path, element, and errorElement.
 */
export const getConfiguredRoutes = (routes: PortalRouteWithChildren[]) => {
	return routes?.map((route) => ({
		path: route.path,
		element: <PortalPage route={route} />,
		errorElement: <PortalMessagePage title={route.messages?.errorMessage || 'Fail to load page'} type={'Error'} />,
		children: route.children?.map((childRoute) => ({
			path: childRoute.path,
			element: <PortalPage route={childRoute} />,
			errorElement: (
				<PortalMessagePage title={childRoute.messages?.errorMessage || 'Fail to load page'} type={'Error'} />
			),
		})),
	}));
};
