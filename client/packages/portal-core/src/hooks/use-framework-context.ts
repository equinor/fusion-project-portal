import { ContextModule } from '@equinor/fusion-framework-module-context';
import { useFramework } from '@equinor/fusion-framework-react';

export const useFrameworkContext = () => {
  return useFramework<[ContextModule]>().modules.context;
};
