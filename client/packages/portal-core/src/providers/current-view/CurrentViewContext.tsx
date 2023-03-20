import { useObservable } from '@equinor/portal-utils';
import {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { BehaviorSubject } from 'rxjs';
import { useStoreCurrentViewId } from '../../hooks';
import { useViewsQuery } from '../../queries';
import { viewStorage } from '../../store';

import { ViewControllerContext } from './view-context';

const currentViewKey$ = new BehaviorSubject<string | undefined>(
  viewStorage.readId()
);

const setViewId = (viewId: string | undefined) => currentViewKey$.next(viewId);

export const useViewController = () => useContext(ViewControllerContext);

type ViewControllerProviderProps = {
  children: ReactNode;
};

export const ViewProvider = ({ children }: ViewControllerProviderProps) => {

  const { data, isLoading } = useViewsQuery();

  const currentViewKey = useObservable(currentViewKey$) || viewStorage.readId();

  const currentView = useMemo(() => {
    if (currentViewKey) {
      return data?.find((view) => view.key === currentViewKey);
    }

    const currentView = data?.find((view) => view.isDefault) || data?.at(0);

    setViewId(currentView?.key);

    return currentView;
  }, [data, currentViewKey]);

  useEffect(() => {
    if (currentViewKey$.value) {
      setViewId(currentViewKey$.value);
      return;
    }
  }, []);

  useStoreCurrentViewId(currentViewKey$);

  return (
    <ViewControllerContext.Provider
      value={{
        getId: () => currentViewKey$.value,
        currentViewKey$: currentViewKey$.asObservable(),
        currentView,
        views: data || [],
        setViewId,
        isLoading,
      }}
    >
      {children}
    </ViewControllerContext.Provider>
  );
};
