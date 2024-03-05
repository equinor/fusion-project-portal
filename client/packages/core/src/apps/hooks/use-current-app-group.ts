import { useCallback, useMemo } from 'react';

import { useAppModule } from '../../app/hooks/use-app-module';
import { useAppGroupsQuery } from './use-app-groups-query';

export const useCurrentAppGroup = (key?: string) => {
	const { appManifest } = useAppModule();

	const { data, isLoading } = useAppGroupsQuery();

	const currentAppGroup = useMemo(() => {
		const nextAppGroup = data?.find((app) => !!app.apps.find((a) => a.appKey === key));
		return nextAppGroup ? nextAppGroup : undefined;
	}, [key, data]);

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
