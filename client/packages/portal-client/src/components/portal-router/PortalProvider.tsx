import { MessagePage, PortalProgressLoader } from '@equinor/portal-ui';

import { usePortalConfig, usePortalRouter } from '@portal/core';
import PeopleResolverProvider from '@equinor/fusion-framework-react-components-people-provider';
import { getRoutes } from './Routes';
import { PortalRouter } from './PortalRouter';
import { Typography } from '@equinor/eds-core-react';

export function PortalProvider() {
	const { portal } = usePortalConfig();
	const { router, isLoading } = usePortalRouter();

	if (isLoading) {
		return <PortalProgressLoader title="Configuring Portal" />;
	}

	return (
		<PeopleResolverProvider>
			{router ? (
				<PortalRouter routes={getRoutes(router || [])} />
			) : (
				<div>
					<MessagePage title="Router Not configured" type="Error">
						<Typography variant="body_short_bold">
							Router configuration for {portal?.name} is not provided.
						</Typography>
						<Typography variant="body_long">
							Portal could not be configured properly, please contact portal administrator
						</Typography>
					</MessagePage>
				</div>
			)}
		</PeopleResolverProvider>
	);
}

export default PortalProvider;
