import { AppManifest, AppModule } from '@equinor/fusion-framework-module-app';
import { useFramework } from '@equinor/fusion-framework-react';
import { useObservableState } from '@equinor/fusion-observable/react';
import { useEffect, useState } from 'react';

type Manifest = AppManifest & { context: unknown };

export const useAppModule = (appKey?: string) => {
	const fusion = useFramework<[AppModule]>();
	const currentApp = useObservableState(fusion.modules.app.current$)?.value;
	// eslint-disable-next-line prefer-destructuring
	const app = fusion.modules.app;

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
