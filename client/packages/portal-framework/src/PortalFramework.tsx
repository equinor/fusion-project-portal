import { PortalFrameworkConfigurator } from './PortalFrameworkConfigurator';
import { createPortalFrameworkProvider } from './create-portal-framework-provider';
import { PropsWithChildren, ReactNode, Suspense, useMemo } from 'react';

type PortalConfigureCallback = (configurator: PortalFrameworkConfigurator) => void;

export const PortalFramework = (
	props: PropsWithChildren<{
		readonly configure: PortalConfigureCallback;
		readonly fallback: NonNullable<ReactNode> | null;
	}>
) => {
	const { configure, fallback, children } = props;
	const Component = useMemo(() => createPortalFrameworkProvider(configure), [configure]);
	return (
		<Suspense fallback={fallback}>
			<Component>{children}</Component>
		</Suspense>
	);
};

export default PortalFramework;
