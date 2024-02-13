import { FusionAppManifest } from '@portal/types';

export const sortByCategoryAndIsDisabled = (favorites: FusionAppManifest[]) => {
	return favorites
		.sort((a, b) => {
			// Sort Disabled apps to bottom
			return (a.category?.name || '') > (b.category?.name || '') ? -1 : 1;
		})
		.sort((a) => {
			// Sort Disabled apps to bottom
			return a.isDisabled ? 1 : -1;
		});
};
