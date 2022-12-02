import { AppGroup } from '../../types';

export interface IMenuState {
  menuActive: boolean;
  appGroups: AppGroup[];
  isLoading: boolean;
}

export interface IMenuContext extends IMenuState {
  toggleMenu<T>(e?: React.MouseEvent<T>): void;
  closeMenu(): void;
}
