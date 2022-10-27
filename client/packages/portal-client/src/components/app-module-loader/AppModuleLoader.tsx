import { useAppLoader } from '@equinor/portal-core';
import { useEffect, useRef } from 'react';

interface ModuleLoaderProps<TProps> {
  moduleId: string;
  props?: TProps;
}

export function ModuleLoader<TProps>({ moduleId }: ModuleLoaderProps<TProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const { loadModule, teardownModule } = useAppLoader();

  useEffect(() => {
    if (ref.current) loadModule(moduleId, ref.current);
    return () => {
      teardownModule && teardownModule();
    };
  }, []);

  return <div ref={ref} />;
}
