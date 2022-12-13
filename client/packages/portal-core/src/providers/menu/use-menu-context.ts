import { useContext } from 'react';
import { IMenuContext } from './menu-types';
import { MenuContext } from './MenuProvider';

export function useMenuContext(): IMenuContext {
  return useContext(MenuContext);
}
