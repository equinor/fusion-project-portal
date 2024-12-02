import { NavigationModule } from '@equinor/fusion-framework-module-navigation';
import { useFramework } from '@equinor/fusion-framework-react-app/framework';
import { getContextPageURL } from './utils';
import { useEffect } from 'react';
import { EventModule } from '@equinor/fusion-framework-module-event';

export const useNavigateOnContextChange = () => {
	const { modules } = useFramework<[NavigationModule, EventModule]>();

	useEffect(() => {
		return modules.event.addEventListener('onCurrentContextChanged', (event) => {
			const url = new URL(getContextPageURL(event.detail.next), location.origin);

			modules.navigation.replace(url);
		});
	}, []);
};
