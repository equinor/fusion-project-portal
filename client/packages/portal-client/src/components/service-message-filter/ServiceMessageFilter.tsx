import { useCurrentApps } from '@portal/core';
import { useEffect } from 'react';
import { useServiceMessage } from '@equinor/service-message';

export const ServiceMessageFilter = () => {
	const currentApps = useCurrentApps(true);
	const { registerCurrentApps, registerPortals } = useServiceMessage();

	useEffect(() => {
		if (currentApps) {
			registerCurrentApps(currentApps.map((app) => app.appKey));
		} else {
			registerCurrentApps([]);
		}
	}, [currentApps]);

	useEffect(() => {
		registerPortals(['Project execution portal']);
	}, []);
	return null;
};
