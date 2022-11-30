import { AppGroup, useMenuItems } from '@equinor/portal-core';
import { storage } from '@equinor/portal-utils';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const MENU_KEY = 'menuState';

const initialState: MenuState = {
  menuActive: false,
  data: [],
  isLoading: false,
};

export interface MenuState {
  menuActive: boolean;
  data: AppGroup[];
  isLoading: boolean;
}

export interface MenuContext extends MenuState {
  toggleMenu<T>(e?: React.MouseEvent<T>): void;
  closeMenu(): void;
}

const MenuContext = createContext<MenuContext>({} as MenuContext);

export const MenuProvider = ({
  children,
}: PropsWithChildren<unknown>): JSX.Element => {
  const [menuState, setMenuState] = useState(
    (storage.getItem<MenuState>(MENU_KEY) as MenuState) || initialState
  );

  const { data, isLoading } = useMenuItems();
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
        data: data || [],
        isLoading,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export function useMenuContext(): MenuContext {
  return useContext(MenuContext);
}
