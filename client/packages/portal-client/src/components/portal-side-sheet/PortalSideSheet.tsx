import { PortalAction, usePortalActions } from '@equinor/portal-core';

import { useEffect, useState } from 'react';

export function PortalSideSheet() {
	const [portalAction, setPortalAction] = useState<PortalAction | undefined>();

	const { activeAction$, closeActiveAction } = usePortalActions();

	useEffect(() => {
		const subscription = activeAction$.subscribe(setPortalAction);
		return () => {
			subscription.unsubscribe();
		};
	}, [activeAction$]);

	const Component = portalAction?.component;
	if (portalAction && Component) {
		return <Component action={portalAction} onClose={closeActiveAction} open={!!portalAction} />;
	}
	return null;
}
