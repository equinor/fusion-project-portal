import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import Framework from '@equinor/fusion-framework-react';

import { PortalProgressLoader } from '@equinor/portal-ui';
import { PortalProvider } from './components/portal-router/PortalRouter';
import { queryClient } from './utils/queryClient/query-client';
import { createPortalFramework } from './lib';
import { configureDebug } from '@equinor/portal-core';
import './customElementsDefinePolyfill';
import { PortalConfig } from '@portal/types';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const portalConfig = window['_config_'];

document.title = `${portalConfig.title} | Fusion`;

/* fusion core is spamming the console form module this will remove it in production */
configureDebug();

const configure = createPortalFramework(portalConfig);

root.render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Framework configure={configure} fallback={<PortalProgressLoader title="Configuring Portal" />}>
				<PortalProvider />
			</Framework>
		</QueryClientProvider>
	</StrictMode>
);

declare global {
	interface Window {
		_config_: PortalConfig;
	}
}
