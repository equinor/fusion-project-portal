import { PortalMessagePage } from '@equinor/portal-ui';
import { PortalRouteWithChildren } from '@portal/core';
import { PortalPage } from './PortalPage';

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
