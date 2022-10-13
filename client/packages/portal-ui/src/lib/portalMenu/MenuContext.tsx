import { createContext, PropsWithChildren, useContext, useState } from 'react';

export const storage = {
  setItem<T>(key: string, data: T): void {
    if (typeof data === 'string') {
      localStorage.setItem(key, data);
    } else {
      localStorage.setItem(key, JSON.stringify(data));
    }
  },

  getItem<T>(key: string): string | T | undefined {
    const data = localStorage.getItem(key);
    if (!data) return undefined;

    try {
      return JSON.parse(data) as T;
    } catch {
      return data;
    }
  },

  removeItem(key: string): void {
    localStorage.removeItem(key);
  },
};

const MENU_KEY = 'menuState';

const initialState: MenuState = {
  menuActive: false,
};

export interface MenuState {
  menuActive: boolean;
}

export interface MenuContext extends MenuState {
  toggleMenu<T>(e?: React.MouseEvent<T>): void;
}

const MenuContext = createContext<MenuContext>({} as MenuContext);

export const MenuProvider = ({
  children,
}: PropsWithChildren<unknown>): JSX.Element => {
  const [menuState, setMenuState] = useState(
    (storage.getItem<MenuState>(MENU_KEY) as MenuState) || initialState
  );
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

  return (
    <MenuContext.Provider
      value={{
        ...menuState,
        toggleMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export function useMenuContext(): MenuContext {
  return useContext(MenuContext);
}
