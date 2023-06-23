import { AppManifest as LegacyAppManifest } from '@equinor/fusion';
import {
  AppManifest as Manifest,
  AppModule,
} from '@equinor/fusion-framework-module-app';
import { useAppModules } from '@equinor/fusion-framework-react-app';
import { useEffect, useState } from 'react';
import { getLegacyFusion } from './leagasy/LegasyAppWrapper';
import LegacyAppContainer from './legacy-interopt/LegacyAppContainer';
import { from, of } from 'rxjs';

type AppManifest = Manifest & Pick<LegacyAppManifest, 'context'>;

const setup = async (appKey: string) => {
  const appContainer = getLegacyFusion().app.container as LegacyAppContainer;

  await appContainer.getAllAsync();
  await appContainer.setCurrentAppAsync(appKey).then(() => {});
  const app = { ...appContainer.currentApp } as LegacyAppManifest;
  return app;
};
export const useAppModule = (appKey: string) => {
  const fusion = useAppModules<[AppModule]>();
  const [currentApp, setCurrentApp] = useState<LegacyAppManifest>();
  const [appManifest, setAppManifest] = useState<
    LegacyAppManifest | undefined
  >();

  // useEffect(() => {
  //   const sub = fusion.app.getAppManifest(appKey).subscribe(setAppManifest);
  //   fusion.app.current;
  //   return () => sub?.unsubscribe();
  // }, [fusion.app, appKey]);

  useEffect(() => {
    from(setup(appKey)).subscribe((a) => {
      console.log('hello', a);
      setAppManifest(a);
    });
  }, [appKey]);
  console.log(appManifest);
  return {
    fusion,
    currentApp,
    appManifest: appManifest as LegacyAppManifest,
  };
};
