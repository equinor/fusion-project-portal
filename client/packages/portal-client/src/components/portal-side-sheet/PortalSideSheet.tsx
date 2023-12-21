import { PortalAction, usePortalActions } from '@equinor/portal-core';

import { useEffect, useState } from 'react';
import { usePortalServices, PortalService } from '@portal/core';
import { useSearchParams } from 'react-router-dom';

export function PortalSideSheet() {
	const [searchParams] = useSearchParams();

	const [portalAction, setPortalAction] = useState<PortalAction | undefined>();
	const [portalWidget, setPortalWidgets] = useState<PortalService | undefined>();

	const { activeAction$, closeActiveAction } = usePortalActions();

	const { activeWidget$, closeActivePortalWidget, setActivePortalWidgetById, preciousWidget } = usePortalServices();

	useEffect(() => {
		const serviceId = searchParams.get('portalServiceId');
		if (serviceId) {
			setActivePortalWidgetById(serviceId);
		}
	}, []);

	useEffect(() => {
		const subscription = activeWidget$.subscribe(setPortalWidgets);
		return () => {
			subscription.unsubscribe();
		};
	}, [activeWidget$]);

	useEffect(() => {
		const subscription = activeAction$.subscribe(setPortalAction);
		return () => {
			subscription.unsubscribe();
		};
	}, [activeAction$]);

	const WComponent = portalWidget?.type === 'PortalReactComponent' ? portalWidget.component : undefined;
	if (portalWidget && WComponent) {
		return (
			<WComponent
				widget={portalWidget}
				onClose={closeActivePortalWidget}
				open={!!portalWidget}
				shouldAnimate={Boolean(preciousWidget)}
			/>
		);
	}

	const Component = portalAction?.component;
	if (portalAction && Component) {
		return <Component action={portalAction} onClose={closeActiveAction} open={!!portalAction} />;
	}

	return null;
}
