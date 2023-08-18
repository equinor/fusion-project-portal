import { AppModule } from '@equinor/fusion-framework-module-app';
import { useFramework } from '@equinor/fusion-framework-react';

export const useFrameWorkAndAppModule = () => {
	const fusion = useFramework<[AppModule]>();
	return { app: fusion.modules.app, fusion };
};
