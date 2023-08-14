import { useEffect } from 'react';
import { lastValueFrom } from 'rxjs';
import { useNavigate, useParams } from 'react-router-dom';
import { useCurrentAppGroup, useFrameworkCurrentContext } from '../hooks';
import AppModuleLoader from './AppModuleLoader';
import { AppNotAwaitable } from './AppNotAwaitable';

import { AppManifest } from '@equinor/fusion-framework-module-app';
import { useAppModule } from '../app/hooks/use-app-module';

export const AppLoader = () => {
	const { appKey, contextId } = useParams();
	const navigate = useNavigate();

	const { appManifest, app } = useAppModule();

	const { isOnboarded, isLoading } = useCurrentAppGroup(appKey);

	const context = useFrameworkCurrentContext();

	useEffect(() => {
		// Is LegacyFusion app check function this should be removed when there are noe more legacy applications
		const isLegacyFusionApplication = async (appKey?: string) => {
			if (appKey) {
				const manifest = await lastValueFrom(app.getAppManifest(appKey));
				return (manifest as AppManifest & { isLegacy: boolean }).isLegacy;
			}
			return false;
		};

		if (
			context &&
			!contextId &&
			!location.pathname.match(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/)
		) {
			isLegacyFusionApplication(appKey).then(
				// navigation should only be performed on new applications and not legacy applications
				(isLegacy) => !isLegacy && navigate(`${location.pathname}/${context.id}`)
			);
		}
	}, [appKey, context, contextId]);

	// The current app is not onboarded and
	if (!isOnboarded && appManifest && !isLoading && context) {
		return <AppNotAwaitable name={appManifest.name} />;
	}

	if (appKey) {
		return <AppModuleLoader appKey={appKey} />;
	}

	return <p> No app key provided.</p>;
};
