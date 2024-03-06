import { AppCategory, AppManifest } from '../types';

export const appsToAppCategory = (apps?: AppManifest[]): AppCategory[] => {
	return (apps || []).reduce((appCategories, appManifest) => {
		if (!appManifest.categoryId) {
			const category = appCategories.find((category) => category.id === 'undefined');

			if (category) {
				category.apps.push(appManifest);
			} else {
				appCategories.push({
					id: 'undefined',
					name: 'Unknown',
					color: null,
					defaultIcon: null,
					apps: [appManifest],
				});
			}

			return appCategories;
		}
		const category = appCategories.find((category) => appManifest.categoryId === category.id);
		if (category) {
			category.apps.push(appManifest);
			return appCategories;
		}

		if (appManifest.category) {
			appCategories.push({
				...appManifest.category,
				apps: [appManifest],
			});
		}

		return appCategories;
	}, [] as AppCategory[]);
};
