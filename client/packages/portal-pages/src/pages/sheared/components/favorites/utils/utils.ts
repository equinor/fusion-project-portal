import { AppManifest } from '@portal/core';

export const sortByCategoryAndIsDisabled = (favorites: AppManifest[]) => {
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
