import { useMemo } from 'react';
import { useAppModule } from '../app-loader';
import { useAppGroupsQuery } from '../queries';

export const useCurrentAppGroup = (appKey?: string) => {
	const { appManifest } = useAppModule();

	const { data, isLoading } = useAppGroupsQuery();

	const currentAppGroup = useMemo(() => {
		const nextAppGroup = data?.find((app) => !!app.apps.find((a) => a.appKey === appKey));
		return nextAppGroup ? nextAppGroup : undefined;
	}, [appKey, data]);

	return {
		isOnboarded: Boolean(currentAppGroup),
		currentAppGroup,
		isLoading,
		appManifest,
	};
};
