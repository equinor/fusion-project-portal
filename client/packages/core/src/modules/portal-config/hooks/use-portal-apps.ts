import { useMemo } from 'react';
import { usePortalConfig } from './use-portal-config';
import { appsToAppCategory } from '../utils/appsToAppCategory';

/**
 * Custom hook to manage portal apps data.
 * Retrieves app data from portal config and organizes it into categories.
 * The Return Object containing apps data, categorized apps, loading state, and error state.
 */
export const usePortalApps = () => {
	const { data: apps, isLoading, error } = usePortalConfig().queryApps;

	// Organize apps into categories using memoized the result
	const appCategories = useMemo(() => {
		return appsToAppCategory(apps);
	}, [apps]);

	// Return apps data, categorized apps, loading state, and error state
	return {
		apps,
		appCategories,
		isLoading,
		error,
	};
};
