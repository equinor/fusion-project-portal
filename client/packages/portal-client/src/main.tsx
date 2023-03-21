import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
// import * as portalConfig from './portal.config.json';
import Framework from '@equinor/fusion-framework-react';

import { PortalProgressLoader } from '@equinor/portal-ui';
import PortalRouter from './components/portal-router/PortalRouter';
import { queryClient } from './utils/queryClient/query-client';
import { createPortalFramework } from './framework-config';
import { PortalConfig } from '../../portal-core/src';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const portalConfig = window['_config_'];

document.title = `${portalConfig.title} | Fusion`;
const configure = createPortalFramework(portalConfig);

root.render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Framework configure={configure} fallback={<PortalProgressLoader title="Configuring Portal" />}>
				<PortalRouter />
			</Framework>
		</QueryClientProvider>
	</StrictMode>
);

declare global {
	interface Window {
		_config_: PortalConfig;
	}
}
