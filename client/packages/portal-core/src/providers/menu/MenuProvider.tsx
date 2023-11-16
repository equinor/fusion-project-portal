import { storage } from '@portal/utils';
import { createContext, PropsWithChildren, useState } from 'react';
import { useAppGroupsQuery } from '@portal/core';
import { IMenuContext, IMenuState } from './menu-types';

const MENU_KEY = 'menuState';

const initialState: IMenuState = {
	menuActive: false,
	appGroups: [],
	isLoading: false,
	searchText: '',
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
			const ns = { ...s, menuActive: false, searchText: '' };
			storage.setItem(MENU_KEY, ns);
			return ns;
		});
	}

	function setSearchText(search: string) {
		setMenuState((s) => {
			const ns = { ...s, searchText: search };
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
				setSearchText,
				appGroups: data || [],
				isLoading,
			}}
		>
			{children}
		</MenuContext.Provider>
	);
};
