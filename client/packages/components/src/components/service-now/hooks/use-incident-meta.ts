import { useCurrentApp } from '@equinor/fusion-framework-react/app';
import { useFrameworkCurrentContext } from '@equinor/portal-core';

export const useIncidentMeta = () => {
	const { currentApp } = useCurrentApp();
	const context = useFrameworkCurrentContext();

	return {
		url: window.location.href,
		origin: window.location.origin,
		contextName: context?.title || 'unknown',
		contextType: context?.type.id || 'unknown',
		currentApp: currentApp?.appKey || 'portal',
		userAgent: window.navigator.userAgent || 'unknown',
	};
};
