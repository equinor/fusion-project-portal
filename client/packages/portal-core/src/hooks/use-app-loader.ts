import { useFramework } from '@equinor/fusion-framework-react/hooks';
import { useCallback, useRef } from 'react';
import { ModuleLoader } from '../module-loader/module';

export function useAppLoader() {
  const fusion = useFramework<[ModuleLoader<'appLoader'>]>();
  const teardownModule = useRef<(() => void) | undefined>();

  let loadModule = useCallback(
    async (moduleId: string, element: HTMLDivElement) => {
      teardownModule.current = await fusion.modules.appLoader.loadModule(
        moduleId,
        element,
        {
          fusion,
          env: {
            basename: window.location.pathname,
          },
        }
      );
    },
    [fusion]
  );

  return {
    loadModule,
    teardownModule: teardownModule.current,
  };
}
