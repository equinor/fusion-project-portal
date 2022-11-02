import { storage } from '@equinor/portal-utils';
import { WorkSurface } from '../types';

const storageKeys = {
  currentWorkSurface: 'current-work-surface',
};

export const storeCurrentWorkSurface = (workSurface?: WorkSurface | string) => {
  switch (typeof workSurface) {
    case 'undefined': {
      storage.setItem(storageKeys.currentWorkSurface, undefined);
      break;
    }
    case 'object': {
      storage.setItem(storageKeys.currentWorkSurface, workSurface.id);
      break;
    }
    case 'string': {
      storage.setItem(storageKeys.currentWorkSurface, workSurface);
    }
  }
};
export const loadCurrentWorkSurface = (): string | undefined => {
  const res = storage.getItem<string>(storageKeys.currentWorkSurface);
  if (res === undefined) {
    return undefined;
  }
  return res;
};
