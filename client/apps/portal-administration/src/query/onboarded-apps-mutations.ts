import { QueryClient } from '@tanstack/react-query';
import { PortalAppMutation } from '../types';

export const mutateOnboardedApps = (queryClient: QueryClient, apps: PortalAppMutation[]) => {
	queryClient.cancelQueries({ queryKey: ['onboarded-apps'] });

	const prevApps = queryClient.getQueryData<PortalAppMutation[]>(['onboarded-apps']) || [];

	const newApps = [
		...prevApps,
		...apps.map((a) => ({
			key: a.appKey,
			contextTypes: a.contextTypes,
		})),
	] as PortalAppMutation[];

	queryClient.setQueryData(['portal-apps'], newApps);
	return { prevApps, newApps };
};
