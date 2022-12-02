import { useAppGroupsQuery } from '@equinor/portal-core';
import { storage } from '@equinor/portal-utils';
import { createContext, PropsWithChildren, useState } from 'react';
import { IMenuContext, IMenuState } from './menu-types';

const MENU_KEY = 'menuState';

const initialState: IMenuState = {
  menuActive: false,
  data: [],
  isLoading: false,
};

export const MenuContext = createContext<IMenuContext>({} as IMenuContext);

export const MenuProvider = ({
  children,
}: PropsWithChildren<unknown>): JSX.Element => {
  const [menuState, setMenuState] = useState(
    (storage.getItem<IMenuState>(MENU_KEY) as IMenuState) || initialState
  );

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
        data: data || [],
        isLoading,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
