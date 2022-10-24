import { useEffect, useRef } from 'react';
import { useModuleLoader } from './use-module-loader';

interface ModuleLoaderProps<TProps> {
  moduleId: string;
  modulePathProvider: (moduleId: string) => Promise<string>;
  props?: TProps;
}

export function ModuleLoader<TProps>({
  props,
  modulePathProvider,
  moduleId,
}: ModuleLoaderProps<TProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const { loadModule, teardownModule } = useModuleLoader(
    modulePathProvider,
    props
  );

  useEffect(() => {
    if (ref.current) loadModule(moduleId, ref.current);
    return () => {
      teardownModule();
    };
  }, []);

  return <div ref={ref} />;
}
