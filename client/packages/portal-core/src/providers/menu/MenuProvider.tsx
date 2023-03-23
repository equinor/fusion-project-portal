import { storage } from '@equinor/portal-utils';
import { createContext, PropsWithChildren, useState } from 'react';
import { useAppGroupsQuery } from '../../queries';
import { IMenuContext, IMenuState } from './menu-types';

const MENU_KEY = 'menuState';

const initialState: IMenuState = {
	menuActive: false,
	appGroups: [],
	isLoading: false,
};

export const MenuContext = createContext<IMenuContext>({} as IMenuContext);

export const MenuProvider = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
	const [menuState, setMenuState] = useState((storage.getItem<IMenuState>(MENU_KEY) as IMenuState) || initialState);

	const { data, isLoading } = useAppGroupsQuery();

	function toggleMenu<T>(e?: React.MouseEvent<T>) {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}

		setMenuState((s) => {
			const ns = { ...s, menuActive: !s.menuActive };
			storage.setItem(MENU_KEY, ns);
			return ns;
		});
	}
	function closeMenu() {
		setMenuState((s) => {
			const ns = { ...s, menuActive: false };
			storage.setItem(MENU_KEY, ns);
			return ns;
		});
	}

	return (
		<MenuContext.Provider
			value={{
				...menuState,
				toggleMenu,
				closeMenu,
				appGroups: data || [],
				isLoading,
			}}
		>
			{children}
		</MenuContext.Provider>
	);
};
