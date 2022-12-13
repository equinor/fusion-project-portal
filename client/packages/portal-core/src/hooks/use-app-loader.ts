import { useFramework } from '@equinor/fusion-framework-react';
import { useEffect, useState } from 'react';
import { ModuleLoader } from '../module-loader/module';

export function useAppLoader(moduleId: string) {
  const fusion = useFramework<[ModuleLoader<'appLoader'>]>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();
  const [module, setModule] = useState<any | undefined>();

  useEffect(() => {
    setIsLoading(true);
    setError(undefined);

    fusion.modules.appLoader.loadModule(moduleId).subscribe({
      next: (module: any) => {
        setModule(module);
      },
      error: setError,
      complete: () => {
        setIsLoading(false);
      },
    });
  }, [moduleId]);

  return {
    isLoading,
    error,
    module,
  };
}
