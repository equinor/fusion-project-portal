import { AppManifest, AppModule } from '@equinor/fusion-framework-module-app';
import { Fusion, useFramework } from '@equinor/fusion-framework-react';
import { useObservableState } from '@equinor/fusion-observable/react';
import { useEffect, useState } from 'react';

type Manifest = AppManifest & { context: unknown };

export const useCurrentApp = (appKey?: string) => {
	const fusion = useFramework<[AppModule]>();
	return useInternalAppModule(fusion, appKey).currentApp;
};

export const useAppModule = (appKey?: string) => {
	const fusion = useFramework<[AppModule]>();
	return useInternalAppModule(fusion, appKey);
};

export const useInternalAppModule = (fusion: Fusion<[AppModule]>, appKey?: string) => {
	const app = fusion.modules.app;

	const currentApp = useObservableState(app.current$)?.value;
	const [appManifest, setAppManifest] = useState<Manifest | undefined>();

	useEffect(() => {
		const sub = currentApp?.manifest$.subscribe((m) => setAppManifest(m as Manifest));
		return () => sub?.unsubscribe();
	}, [currentApp]);

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
