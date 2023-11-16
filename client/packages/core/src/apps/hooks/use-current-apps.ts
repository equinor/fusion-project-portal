import { App } from '@portal/types';
import { useMemo } from 'react';
import { useAppGroupsQuery } from './use-app-groups-query';

export const useCurrentApps = (shouldFilter?: boolean) => {
	const { data } = useAppGroupsQuery();
	if (!shouldFilter) return undefined;
	return useMemo(() => {
		if (!data) return [];
		return data.reduce((acc, app) => {
			return [...acc, ...app.apps];
		}, [] as App[]);
	}, [data]);
};
