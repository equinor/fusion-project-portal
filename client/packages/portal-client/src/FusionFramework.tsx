import { Suspense, useMemo } from 'react';
import { PortalConfig } from '@portal/types';

import { createFrameworkProvider } from '@equinor/fusion-framework-react';

import { PortalProgressLoader } from '@equinor/portal-ui';
import { PortalProvider } from './components/portal-router/PortalRouter';
import { createPortalFramework } from './lib';

import { ModulesInstance, AnyModule, ModulesInstanceType } from '@equinor/fusion-framework-module';

export const FusionFramework = (props: { portalConfig: PortalConfig; modules: ModulesInstance<AnyModule[]> }) => {
	const Framework = createFrameworkProvider(createPortalFramework(props.portalConfig), props.modules);
	return (
		<Suspense fallback={<PortalProgressLoader title="Configuring Portal" />}>
			<Framework>
				<PortalProvider />
			</Framework>
		</Suspense>
	);
};
