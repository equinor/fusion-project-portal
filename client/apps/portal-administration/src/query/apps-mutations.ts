import { QueryClient } from '@tanstack/react-query';
import { PortalApplication } from '../types';

export const mutatePortalApps = (queryClient: QueryClient, portalId: string | undefined, apps: PortalApplication[]) => {
	queryClient.cancelQueries({ queryKey: ['portal-onboarded-apps', portalId] });

	const prevApps = queryClient.getQueryData<PortalApplication[]>(['portal-onboarded-apps', portalId]) || [];

	const newApps = prevApps.map((a) => {
		const isActive = apps.find((app) => app.key === a.key);
		if (isActive) {
			return { ...a, isActive: true };
		}
		return a;
	});

	queryClient.setQueryData(['portal-onboarded-apps', portalId], newApps);
	return { prevApps, newApps };
};

export const mutateDeletePortalApps = (
	queryClient: QueryClient,
	portalId: string | undefined,
	apps: PortalApplication[]
) => {
	queryClient.cancelQueries({ queryKey: ['portal-onboarded-apps', portalId] });
	const prevApps = queryClient.getQueryData<PortalApplication[]>(['portal-onboarded-apps', portalId]) || [];

	const appKeys = apps.map((a) => a.key);
	const newApps = prevApps?.map((a) => (appKeys.includes(a.key) ? { ...a, isActive: false } : a));
	queryClient.setQueryData(['portal-onboarded-apps', portalId], newApps);
	return { prevApps, newApps };
};
