import { FullPageLoading } from '@equinor/portal-ui';
import { useObservable } from '@equinor/portal-utils';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { BehaviorSubject, Observable } from 'rxjs';
import { useStoreCurrentViewId } from '../../hooks';
import { useViewsQuery } from '../../queries';
import { viewStorage } from '../../store';
import { View } from '../../types';
import { FailedToLoadViews } from './FailedToLoadViews';

/** View context type */
type ViewController = {
  setViewId: (viewId: string | undefined) => void;
  getId: () => string | undefined;
  currentViewKey$: Observable<string | undefined>;
  currentView: View | undefined;
  views: View[];
  isLoading: boolean;
};

const ViewControllerContext = createContext<ViewController>({} as any);

export const useViewController = () => useContext(ViewControllerContext);

const currentViewKey$ = new BehaviorSubject<string | undefined>(
  viewStorage.readId()
);

const setViewId = (viewId: string | undefined) => currentViewKey$.next(viewId);

type ViewControllerProviderProps = {
  children: ReactNode;
};

export const ViewProvider = ({ children }: ViewControllerProviderProps) => {
  /** Don't halt user if he/she is loading an app */
  const shouldHalt = !location.pathname.includes('apps');

  const { data, isLoading, error } = useViewsQuery();

  const currentViewKey = useObservable(currentViewKey$) || viewStorage.readId();

  const currentView = useMemo(() => {
    if (currentViewKey)
      return data?.find((view) => view.key === currentViewKey);

    const currentView = data?.find((view) => view.isDefault);
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

  if (error && shouldHalt) {
    return <FailedToLoadViews error={error as Response} />;
  }

  if (isLoading && shouldHalt) {
    return <FullPageLoading detail="Loading views" />;
  }

  return (
    <ViewControllerContext.Provider
      value={{
        getId: () => currentViewKey$.value,
        currentViewKey$,
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
