import { useEffect } from 'react';
import { useCurrentApp } from './use-current-app';
import { useCurrentAppManifest } from './use-current-app-manifest';
import { useFrameWorkAndAppModule } from './use-framework-and-app-module';

export const useAppModule = (appKey?: string) => {
	// rename app to app module
	const { app, fusion } = useFrameWorkAndAppModule();
	const currentApp = useCurrentApp(app);
	const appManifest = useCurrentAppManifest(currentApp);

	useEffect(() => {
		appKey && app.setCurrentApp(appKey);
	}, [app, appKey]);

	return {
		app,
		fusion,
		currentApp,
		appManifest,
	};
};
