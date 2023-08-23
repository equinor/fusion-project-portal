import { lastValueFrom } from 'rxjs';

import { AppManifest, AppModuleProvider } from '@equinor/fusion-framework-module-app';

/** Is LegacyFusion app check function this should be removed when there are noe more legacy applications */
export const isLegacyFusionApplication = async (args: { appKey?: string; appProvider: AppModuleProvider }) => {
	const { appKey, appProvider } = args;
	if (appKey) {
		const manifest = await lastValueFrom(appProvider.getAppManifest(appKey));
		return isLegacyManifest(manifest);
	}
	return false;
};

export const isLegacyManifest = (manifest: AppManifest) => {
	return (manifest as AppManifest & { isLegacy: boolean }).isLegacy;
};
