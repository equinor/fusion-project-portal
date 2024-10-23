import { NavigationModule } from '@equinor/fusion-framework-module-navigation';
import { useFramework } from '@equinor/fusion-framework-react';
import { getContextPageURL } from '../utils';
import { useEffect } from 'react';

export const useNavigateOnContextChange = () => {
	const { modules } = useFramework<[NavigationModule]>();
	useEffect(() => {
		modules.event.addEventListener('onCurrentContextChanged', (event) => {
			const url = new URL(getContextPageURL(event.detail.next), location.origin);

			modules.navigation.replace(url);
		});
	}, []);
};
