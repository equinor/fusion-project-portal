import { useEffect } from 'react';
import { Observable } from 'rxjs';
import { viewStorage } from '../store';

export function useStoreCurrentViewId(obs$: Observable<string | undefined>) {
  useEffect(() => {
    const sub = obs$.subscribe(viewStorage.storeId);
    return () => sub.unsubscribe();
  }, []);
}
