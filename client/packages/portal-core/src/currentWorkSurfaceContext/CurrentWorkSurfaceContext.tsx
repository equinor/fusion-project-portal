import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';
import { BehaviorSubject, Observable } from 'rxjs';
import { useNavigateOnViewChanged } from '../hooks/useNavigateOnViewChanged';
import { useViews } from '../queries';

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
    new BehaviorSubject<string | undefined>(undefined)
  );
  const setViewId = useCallback(
    (viewId: string | undefined) => currentWorkSurfaceId$.current.next(viewId),
    []
  );

  /** Switches routes based on current view id */
  useNavigateOnViewChanged(useMemo(() => currentWorkSurfaceId$.current, []));

  if (error && shouldHalt) {
    return <div>Phases failed to load</div>;
  }

  if (isLoading && shouldHalt) {
    return <div>Loading work surfaces</div>;
  }

  return (
    <CurrentWorkSurfaceId.Provider
      value={{
        getId: () => currentWorkSurfaceId$.current.value,
        id$: currentWorkSurfaceId$.current.asObservable(),
        setViewId,
      }}
    >
      {children}
    </CurrentWorkSurfaceId.Provider>
  );
};
