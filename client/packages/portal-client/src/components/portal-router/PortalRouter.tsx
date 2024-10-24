import { useMemo } from 'react';
import { RouteObject, RouterProvider } from 'react-router-dom';
import { useFramework } from '@equinor/fusion-framework-react';
import { NavigationModule } from '@equinor/fusion-framework-module-navigation';

export function PortalRouter({ routes }: { routes: RouteObject[] }) {
	const { navigation } = useFramework<[NavigationModule]>().modules;
	const router = useMemo(() => navigation.createRouter(routes), []);
	return <RouterProvider router={router} />;
}
