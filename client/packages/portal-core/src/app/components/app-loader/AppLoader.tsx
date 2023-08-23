import { useCurrentAppGroup } from '../../hooks';
import { AppModuleLoader } from '../app-module-loader/AppModuleLoader';
import { AppNotAwaitable } from '../app-not-awaitable/AppNotAvailable';
import { PortalProgressLoader } from '@equinor/portal-ui';

export const AppContainer = ({ hasContext, appKey }: { hasContext: boolean; appKey?: string }) => {
	const { isAppNotAvailable, appName } = useCurrentAppGroup(appKey);

	if (isAppNotAvailable(hasContext)) {
		return <AppNotAwaitable name={appName} />;
	}

	if (appKey) {
		return (
			<AppModuleLoader appKey={appKey}>
				<PortalProgressLoader title="Loading App" />
			</AppModuleLoader>
		);
	}

	throw new Error('No appKey provided.');
};
