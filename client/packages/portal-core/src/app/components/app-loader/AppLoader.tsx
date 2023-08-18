import { useCurrentAppGroup } from '../../hooks';
import { AppModuleLoader } from '../app-module-loader/AppModuleLoader';
import { AppNotAwaitable } from '../app-not-awaitable/AppNotAvailable';

import { ErrorViewer } from '../error-view/ErrorView';

export const AppContainer = ({
	hasContext,
	appName,
	appKey,
}: {
	hasContext: boolean;
	appKey?: string;
	appName?: string;
}) => {
	// Todo refactor this to hook with all needed to simplify first if check
	const { isOnboarded, isLoading } = useCurrentAppGroup(appKey);

	if (!isOnboarded && appName && !isLoading && hasContext) {
		return <AppNotAwaitable name={appName} />;
	}

	if (appKey) {
		return <AppModuleLoader appKey={appKey} />;
	}

	return <ErrorViewer error={new Error('No appKey provided.')} />;
};
