import { useEffect } from 'react';
import { useCurrentApp } from './use-current-app';
import { useCurrentAppManifest } from './use-current-app-manifest';
import { useFrameWorkAndAppModule } from './use-framework-and-app-module';

export const useAppModule = (appKey?: string) => {
	// rename app to app module
	const { appModule, fusion } = useFrameWorkAndAppModule();
	const currentApp = useCurrentApp(appModule);
	const appManifest = useCurrentAppManifest(currentApp);

	useEffect(() => {
		appKey && appModule.setCurrentApp(appKey);
	}, [appModule, appKey]);

	return {
		appModule,
		fusion,
		currentApp,
		appManifest,
	};
};
