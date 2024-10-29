import { NavigationModule } from '@equinor/fusion-framework-module-navigation';
import { useFramework } from '@equinor/fusion-framework-react-app/framework';
import { useContextProvider } from '@equinor/fusion-framework-react-app/context';
import { getContextPageURL } from './utils';
import { useEffect } from 'react';
import { IContextProvider } from '@equinor/fusion-framework-module-context';

export const useNavigateOnContextChange = () => {
	const { modules } = useFramework<[NavigationModule]>();
	const provider: IContextProvider = useContextProvider();
	useEffect(() => {
		const sub =  provider.currentContext$.subscribe((context) => {
			const url = new URL(getContextPageURL(context), location.origin);

			modules.navigation.replace(url);
		});
    return ()=> sub.unsubscribe()
	}, []);
};
