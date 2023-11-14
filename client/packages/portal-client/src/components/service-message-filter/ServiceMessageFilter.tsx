import { useCurrentApps } from '@portal/core';
import { useEffect } from 'react';
import { useServiceMessage } from '@equinor/service-message';

export const ServiceMessageFilter = () => {
	const currentApps = useCurrentApps(true)?.map((app) => app.appKey);
	const { registerCurrentApps } = useServiceMessage();

	useEffect(() => {
		if (currentApps) {
			registerCurrentApps(currentApps);
		}
	}, [currentApps]);
	return null;
};
