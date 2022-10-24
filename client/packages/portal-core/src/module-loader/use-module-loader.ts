import { useFramework } from '@equinor/fusion-framework-react/hooks';
import { useCallback, useMemo } from 'react';
import { ModuleLoaderController } from './module-loader';

export function useModuleLoader<TProps>(
  modulePathProvider: (moduleId: string) => Promise<string>,
  props?: TProps
) {
  const framework = useFramework();

  const loader = useMemo(
    () => new ModuleLoaderController(modulePathProvider),
    []
  );

  let loadModule = useCallback(
    (moduleId: string, element: HTMLDivElement) => {
      loader.loadModule(moduleId, element, framework, props);
    },
    [props, framework]
  );

  return {
    loadModule,
    teardownModule: loader.teardownModule,
  };
}
