import { storage } from '@equinor/portal-utils';

export const viewStorage = {
  key: 'currentViewId',
  readId: (): string | undefined => storage.getItem(viewStorage.key),
  storeId: (id: string | undefined) => storage.setItem(viewStorage.key, id),
};
