import { FullPageLoading } from '@equinor/portal-ui';
import { storage } from '@equinor/portal-utils';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { BehaviorSubject, Observable } from 'rxjs';
import { useNavigateOnViewChanged } from '../hooks/useNavigateOnViewChanged';
import { useViews } from '../queries';
import { FailedToLoadViews } from './FailedToLoadWorkSurfaces';

/** View context type */
type ViewController = {
  setViewId: (viewId: string | undefined) => void;
  getId: () => string | undefined;
  id$: Observable<string | undefined>;
};

const ViewControllerContext = createContext<ViewController>({} as any);

export const useViewController = () => useContext(ViewControllerContext);

type ViewControllerProviderProps = {
  children: ReactNode;
};

export const ViewProvider = ({ children }: ViewControllerProviderProps) => {
  /** Dont halt user if he/she is loading an app */
  const shouldHalt = !location.pathname.includes('apps');

  const { isLoading, error } = useViews();

  const currentViewId$ = useRef(
    new BehaviorSubject<string | undefined>(viewStorage.readId())
  );
  const setViewId = useCallback(
    (viewId: string | undefined) => currentViewId$.current.next(viewId),
    []
  );

  const id$ = useMemo(() => currentViewId$.current.asObservable(), []);

  /** Switches routes based on current view id */
  useNavigateOnViewChanged(id$);
  useStoreCurrentViewId(id$);
  if (error && shouldHalt) {
    return <FailedToLoadViews error={error as Response} />;
  }

  if (isLoading && shouldHalt) {
    return <FullPageLoading detail="Loading views" />;
  }

  return (
    <ViewControllerContext.Provider
      value={{
        getId: () => currentViewId$.current.value,
        id$: id$,
        setViewId,
      }}
    >
      {children}
    </ViewControllerContext.Provider>
  );
};

function useStoreCurrentViewId(obs$: Observable<string | undefined>) {
  useEffect(() => {
    const sub = obs$.subscribe(viewStorage.storeId);
    return () => sub.unsubscribe();
  }, []);
}

export const viewStorage = {
  key: 'currentViewId',
  readId: (): string | undefined => storage.getItem(viewStorage.key),
  storeId: (id: string | undefined) => storage.setItem(viewStorage.key, id),
};
