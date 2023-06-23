import { lazy } from 'react';
import AppWrapperLegacy, { getLegacyFusion } from './LegasyAppWrapper';

import {
  AppConfig,
  AppManifest,
  IApp,
} from '@equinor/fusion-framework-module-app';
import { AppManifest as LegacyAppManifest } from '@equinor/fusion';
import { AppModule } from '@equinor/fusion-framework-module-app';
import { AppModulesInstance } from '@equinor/fusion-framework-react-app';
import LegacyAppContainer from '../legacy-interopt/LegacyAppContainer';
export type LegacyEnv = {
  basename: string;
  config: AppConfig;
  manifest: LegacyAppManifest;
};

export const createLegacyAppLoader = (
  appKey: string,
  fusion: AppModulesInstance<[AppModule]>
) =>
  lazy(async () => {
    const appContainer = getLegacyFusion().app.container as LegacyAppContainer;
    const [basename] = window.location.pathname.match(
      /\/?apps\/[a-z|-]+\//
    ) ?? [''];

    // const [config = {} as AppConfig] = await Promise.allSettled([
    //   fusion.app.getAppConfig(appKey),
    // ]).then(
    //   (result) =>
    //     result.map((x) => (x.status === 'fulfilled' ? x.value : undefined)) as [
    //       AppConfig | undefined
    //     ]
    // );

    await appContainer.getAllAsync();
    await appContainer.requestUpdate();

    /** this should load script */

    const config = await appContainer.setCurrentAppAsync(appKey);
    if (!config) {
      return {
        default: () => <>no app config</>,
      };
    }

    const env = {
      basename,
      config,
      manifest: { ...appContainer.currentApp } as LegacyAppManifest,
    };

    console.log('appConfig', env);
    return {
      default: () => (
        <>
          <AppWrapperLegacy appKey={appKey} env={env} />,
        </>
      ),
    };
  });
