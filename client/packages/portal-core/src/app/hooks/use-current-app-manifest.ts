import { AppManifest, CurrentApp } from '@equinor/fusion-framework-module-app';
import { useEffect, useState } from 'react';

type Manifest = AppManifest & { context: unknown };
export const useCurrentAppManifest = (currentApp: CurrentApp) => {
	const [appManifest, setAppManifest] = useState<Manifest | undefined>();

	useEffect(() => {
		const sub = currentApp?.manifest$.subscribe((m) => {
			setAppManifest(m as Manifest);
		});
		return () => sub?.unsubscribe();
	}, [currentApp]);

	return appManifest;
};
