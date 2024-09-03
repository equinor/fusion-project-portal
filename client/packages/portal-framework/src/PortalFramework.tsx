import { PortalFrameworkConfigurator } from './PortalFrameworkConfigurator';
import { createPortalFrameworkProvider } from './create-portal-framework-provider';
import { PropsWithChildren, ReactNode, Suspense, useMemo } from 'react';

type PortalConfigureCallback = (configurator: PortalFrameworkConfigurator) => void;

export const PortalFramework = (
	props: PropsWithChildren<{
		readonly configure: PortalConfigureCallback;
		readonly fallback: NonNullable<ReactNode> | null;
		readonly portalId: string;
	}>
) => {
	const { configure, fallback, children, portalId } = props;
	const Component = useMemo(() => createPortalFrameworkProvider(configure, portalId), [configure, portalId]);
	return (
		<Suspense fallback={fallback}>
			<Component>{children}</Component>
		</Suspense>
	);
};

export default PortalFramework;
