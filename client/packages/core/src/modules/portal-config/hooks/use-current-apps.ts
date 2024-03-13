import { usePortalApps } from './use-portal-apps';

export const useCurrentApps = (shouldFilter?: boolean) => {
	const { apps } = usePortalApps();
	if (!shouldFilter) return undefined;
	return apps;
};
