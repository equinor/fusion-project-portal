import { QueryClient } from '@tanstack/react-query';
import {  PortalApplication } from '../types';

export const mutatePortalApps = (queryClient: QueryClient, portalId: string | undefined, apps: PortalApplication[]) => {
	queryClient.cancelQueries({ queryKey: ['portal-onboarded-apps', portalId] });

	const prevApps = queryClient.getQueryData<PortalApplication[]>(['portal-onboarded-apps', portalId]) || [];

	const newApps = prevApps.map((prevApp) => {
		const isActive = apps.find((app) => app.appManifest.appKey === prevApp.appManifest.appKey);
		if (isActive) {
			return { ...prevApp, isActive: true };
		}
		return prevApp;
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

	const appKeys = apps.map((app) => app.appManifest.appKey);
	const newApps = prevApps?.map((prevApp) => (appKeys.includes(prevApp.appManifest.appKey) ? { ...prevApp, isActive: false } : prevApp));
	queryClient.setQueryData(['portal-onboarded-apps', portalId], newApps);
	return { prevApps, newApps };
};

export const mutateAddPortalAppWithContexts = (
	queryClient: QueryClient,
	appKey: string | undefined,
	contexts: string[],
	portalId: string | undefined
) => {
	queryClient.cancelQueries({ queryKey: ['portal-onboarded-app', portalId, appKey] });

	const prevApp = queryClient.getQueryData<PortalApplication>(['portal-onboarded-app', portalId, appKey]);
	const contextIds = [...(prevApp?.contextIds || [])];
	contexts.forEach((contextId) => {
		if (!contextIds.includes(contextId)) contextIds?.push(contextId);
	});

	const newApp = { ...prevApp, contextIds: contextIds };
	queryClient.setQueryData(['portal-onboarded-app', portalId, appKey], newApp);
	return { prevApp, newApp };
};

export const mutateRemovePortalAppWithContexts = (
	queryClient: QueryClient,
	appKey: string | undefined,
	contexts: string[],
	portalId: string | undefined
) => {
	queryClient.cancelQueries({ queryKey: ['portal-onboarded-app', portalId, appKey] });

	const prevApp = queryClient.getQueryData<PortalApplication>(['portal-onboarded-app', portalId, appKey]);

	const contextIds = [...(prevApp?.contextIds || [])];

	const newApp = Object.assign({}, prevApp);
	newApp.contextIds = contextIds.filter((id) => !contexts.includes(id));

	queryClient.setQueryData(['portal-onboarded-app', portalId, appKey], newApp);
	return { prevApp, newApp };
};
