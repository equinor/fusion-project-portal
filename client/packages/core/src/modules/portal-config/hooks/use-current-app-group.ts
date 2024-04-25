import { useMemo } from 'react';
import { useAppModule } from '../../../app/hooks/use-app-module';
import { usePortalApps } from './use-portal-apps';

export const useCurrentAppGroup = (key?: string) => {
	const { appManifest } = useAppModule();

	const { appCategories, isLoading } = usePortalApps();

	const currentAppGroup = useMemo(() => {
		const nextAppGroup = appCategories?.find((app) => !!app.apps?.find((a) => a.key === key));
		return nextAppGroup ? nextAppGroup : undefined;
	}, [key, appCategories]);

	return {
		currentAppGroup,
		isLoading,
		appName: appManifest?.name,
	};
};
