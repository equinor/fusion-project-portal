import { AppManifest, AppModule } from '@equinor/fusion-framework-module-app';
import { useFramework } from '@equinor/fusion-framework-react';
import { useObservableState } from '@equinor/fusion-observable/react';
import { useEffect, useState } from 'react';

export const useAppModule = () => {
	const fusion = useFramework<[AppModule]>();
	const currentApp = useObservableState(fusion.modules.app.current$);

	const [appManifest, setAppManifest] = useState<AppManifest | undefined>();

	useEffect(() => {
		currentApp?.manifest$.subscribe(setAppManifest);
	}, [currentApp]);

	return {
		app: fusion.modules.app,
		fusion,
		currentApp,
		appManifest,
	};
};
