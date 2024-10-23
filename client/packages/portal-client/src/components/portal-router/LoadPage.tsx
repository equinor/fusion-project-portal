import { PortalRoute } from '@portal/core';

import { AppElementProvider } from '../app-element-provider/AppElementProvider';
import { PortalMessagePage, PortalProgressLoader } from '@equinor/portal-ui';

export const LoadPage = ({ pageKey, messages, path }: Partial<PortalRoute>) => {
	if (!pageKey) return <PortalMessagePage title="Page Key not provided" />;

	return (
		<AppElementProvider appKey={pageKey} baseName={path}>
			<PortalProgressLoader title={messages?.loadingMessage || 'Loading'} />
		</AppElementProvider>
	);
};
