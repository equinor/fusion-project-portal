import { storage } from '@equinor/portal-utils';
import { BehaviorSubject, tap } from 'rxjs';

//Key the value is stored under
const storageKey = 'menu-favorites';

//Store for using localstorage
const menuFavoritesStore = {
  read: () => storage.getItem(storageKey) as string[] | undefined,
  store: (data: string[]) => {
    storage.setItem(storageKey, data);
  },
};

const menuFavorites = new BehaviorSubject<string[]>(
  menuFavoritesStore.read() ?? []
);

export const menuFavoritesController = {
  onClickFavorite: (value: string) =>
    menuFavorites.next(
      menuFavorites.value.includes(value)
        ? menuFavorites.value.filter((s) => s !== value)
        : [...menuFavorites.value, value]
    ),
  //Store everytime a new value is emitted
  favorites$: menuFavorites.pipe(tap(menuFavoritesStore.store)),
};
