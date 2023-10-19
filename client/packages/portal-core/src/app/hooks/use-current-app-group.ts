import { useCallback, useMemo } from 'react';

import { useAppGroupsQuery } from '../../queries';
import { useAppModule } from './use-app-module';

export const useCurrentAppGroup = (appKey?: string) => {
	const { appManifest } = useAppModule();

	const { data, isLoading } = useAppGroupsQuery();

	const currentAppGroup = useMemo(() => {
		const nextAppGroup = data?.find((app) => !!app.apps.find((a) => a.appKey === appKey));
		return nextAppGroup ? nextAppGroup : undefined;
	}, [appKey, data]);

	const isAppNotAvailable = useCallback(
		(hasContext: boolean) => {
			return Boolean(!currentAppGroup && appManifest?.name && !isLoading && hasContext);
		},
		[currentAppGroup, isLoading, appManifest]
	);

	return {
		isAppNotAvailable,
		currentAppGroup,
		isLoading,
		appManifest,
		appName: appManifest?.name,
	};
};
