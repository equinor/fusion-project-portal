import { useIsAppAvailable } from '@portal/core';
import { AppNotAwaitable } from '../app-not-awaitable/AppNotAvailable';
import { PortalProgressLoader } from '@equinor/portal-ui';
import { AppElementProvider } from '../app-element-provider/AppElementProvider';

export const AppProvider = ({ hasContext, appKey }: { hasContext: boolean; appKey?: string }) => {
	const { isAppAvailable, appName } = useIsAppAvailable(appKey);

	if (isAppAvailable(hasContext) && appKey) {
		return (
			<AppElementProvider appKey={appKey}>
				<PortalProgressLoader title="Loading" />
			</AppElementProvider>
		);
	}
	return <AppNotAwaitable name={appName} />;
};
