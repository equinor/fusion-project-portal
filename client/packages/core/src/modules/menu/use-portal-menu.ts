import { useFramework } from '@equinor/fusion-framework-react';
import { PortalMenuModule } from './module';
import { useObservableState } from '@equinor/fusion-observable/react';

export const usePortalMenu = () => {
	const fusion = useFramework<[PortalMenuModule]>();
	const { toggleMenu, closeMenu, setSearchText, state, state$ } = fusion.modules.menu;
	const menuState = useObservableState(state$, { initial: state }).value;
	return {
		...menuState,
		toggleMenu,
		closeMenu,
		setSearchText,
	};
};
