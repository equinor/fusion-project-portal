import { AppManifest, AppModule } from '@equinor/fusion-framework-module-app';
import { useFramework } from '@equinor/fusion-framework-react';
import { useObservableState } from '@equinor/fusion-observable/react';
import { useEffect, useState } from 'react';

type Manifest = AppManifest & { context: {} };

export const useAppModule = () => {
	const fusion = useFramework<[AppModule]>();
	const currentApp = useObservableState(fusion.modules.app.current$)?.value;

	const [appManifest, setAppManifest] = useState<Manifest | undefined>();

	useEffect(() => {
		const sub = currentApp?.manifest$.subscribe((m) => setAppManifest(m as Manifest));
		return () => sub?.unsubscribe();
	}, [currentApp]);

	return {
		app: fusion.modules.app,
		fusion,
		currentApp,
		appManifest,
	};
};
