import { useCallback } from 'react';
import { useCurrentAppGroup } from './use-current-app-group';

export const useIsAppAvailable = (key?: string) => {
	const { appName, currentAppGroup, isLoading } = useCurrentAppGroup(key);

	const isAppAvailable = useCallback(
		(hasContext: boolean) => {
			return !Boolean(!currentAppGroup && appName && !isLoading && hasContext);
		},
		[currentAppGroup, isLoading, appName]
	);

	return {
		isAppAvailable,
		appName,
	};
};
