import { useCurrentAppGroup } from '@portal/core';
import { AppNotAwaitable } from '../app-not-awaitable/AppNotAvailable';
import { PortalProgressLoader } from '@equinor/portal-ui';
import { AppElementProvider } from '../app-element-provider/AppElementProvider';

export const AppProvider = ({ hasContext, appKey }: { hasContext: boolean; appKey?: string }) => {
	const { isAppNotAvailable, appName } = useCurrentAppGroup(appKey);

	if (isAppNotAvailable(hasContext)) {
		return <AppNotAwaitable name={appName} />;
	}

	if (appKey) {
		return (
			<AppElementProvider appKey={appKey}>
				<PortalProgressLoader title="Loading App" />
			</AppElementProvider>
		);
	}

	throw new Error('No appKey provided.');
};
