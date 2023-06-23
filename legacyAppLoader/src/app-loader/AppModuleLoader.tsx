import { FC, Suspense, useMemo } from 'react';

import { createLegacyAppLoader } from './leagasy/LegasyAppLoader';

import { useAppModules } from '@equinor/fusion-framework-react-app';
import { AppModule } from '@equinor/fusion-framework-module-app';

interface CurrentAppLoaderProps {
  appKey: string;
}

export const AppModuleLoader: FC<CurrentAppLoaderProps> = ({ appKey }) => {
  // const { appManifest, currentApp } = useAppModule(appKey);
  const fusion = useAppModules<[AppModule]>();

  const LegacyLoader = useMemo(() => createLegacyAppLoader(appKey, fusion), []);

  return (
    <Suspense fallback={<>loading...</>}>
      <LegacyLoader />
    </Suspense>
  );
};

export default AppModuleLoader;
