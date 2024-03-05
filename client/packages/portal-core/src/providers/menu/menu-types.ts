import { AppCategory } from '@portal/core';

export interface IMenuState {
	menuActive: boolean;
	appGroups: AppCategory[];
	isLoading: boolean;
	searchText: string;
}

export interface IMenuContext extends IMenuState {
	setSearchText(searchText: string): void;
	toggleMenu<T>(e?: React.MouseEvent<T>): void;
	closeMenu(): void;
}
