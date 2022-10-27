import { createObservableStorage } from '@equinor/portal-utils';

//Key the value is stored under
const storageKey = 'menu-favorites';

const { next, subject$, obs$ } = createObservableStorage<string[]>(
  storageKey,
  []
);

export const menuFavoritesController = {
  onClickFavorite: (value: string) =>
    next(
      subject$.value.includes(value)
        ? subject$.value.filter((s) => s !== value)
        : [...subject$.value, value]
    ),
  //Store everytime a new value is emitted
  favorites$: obs$,
};
