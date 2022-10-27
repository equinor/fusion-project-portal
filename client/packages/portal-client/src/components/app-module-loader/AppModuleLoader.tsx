import { useAppLoader } from '@equinor/portal-core';
import { useEffect, useRef, useState } from 'react';
import { from, take, tap } from 'rxjs';
import { AppLoadingTransition } from './AppLoadingTransition';

interface ModuleLoaderProps<TProps> {
  moduleId: string;
  props?: TProps;
}

export function ModuleLoader<TProps>({ moduleId }: ModuleLoaderProps<TProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const { loadModule, teardownModule } = useAppLoader();
  const [appLoading, setAppLoading] = useState(true);
  useEffect(() => {
    if (ref.current) {
      const sub = from(loadModule(moduleId, ref.current)).subscribe(() => {
        setAppLoading(false);
        sub.unsubscribe();
      });
    }
    return () => {
      teardownModule && teardownModule();
    };
  }, []);

  return (
    <>
      {appLoading && <AppLoadingTransition />}
      <div ref={ref} />
    </>
  );
}
