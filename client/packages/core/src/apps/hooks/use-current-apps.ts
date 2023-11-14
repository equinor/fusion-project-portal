import { useAppGroupsQuery, App } from '@equinor/portal-core';
import { useMemo } from 'react';

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
