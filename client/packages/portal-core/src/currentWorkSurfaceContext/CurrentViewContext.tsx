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
import { FailedToLoadWorkSurfaces } from './FailedToLoadWorkSurfaces';
import { LoadingWorkSurfacesTransition } from './LoadingWorkSurfacesTransition';

/** View context type */
type ViewController = {
  setViewId: (viewId: string | undefined) => void;
  getId: () => string | undefined;
  id$: Observable<string | undefined>;
};

const CurrentWorkSurfaceId = createContext<ViewController>({} as any);

export const useCurrentWorkSurfaceId = () => useContext(CurrentWorkSurfaceId);

type CurrentWorkSurfaceIdProviderProps = {
  children: ReactNode;
};

export const CurrentWorkSurfaceIdProvider = ({
  children,
}: CurrentWorkSurfaceIdProviderProps) => {
  /** Dont halt user if he/she is loading an app */
  const shouldHalt = !location.pathname.includes('apps');

  const { isLoading, error } = useViews();

  const currentWorkSurfaceId$ = useRef(
    new BehaviorSubject<string | undefined>(viewStorage.readId())
  );
  const setViewId = useCallback(
    (viewId: string | undefined) => currentWorkSurfaceId$.current.next(viewId),
    []
  );

  const id$ = useMemo(() => currentWorkSurfaceId$.current.asObservable(), []);

  /** Switches routes based on current view id */
  useNavigateOnViewChanged(id$);
  useStoreCurrentViewId(id$);
  if (error && shouldHalt) {
    return <FailedToLoadWorkSurfaces error={error as Response} />;
  }

  if (isLoading && shouldHalt) {
    return <LoadingWorkSurfacesTransition />;
  }

  return (
    <CurrentWorkSurfaceId.Provider
      value={{
        getId: () => currentWorkSurfaceId$.current.value,
        id$: id$,
        setViewId,
      }}
    >
      {children}
    </CurrentWorkSurfaceId.Provider>
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
