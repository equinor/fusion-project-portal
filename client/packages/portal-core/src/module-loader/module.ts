import type { Module } from '@equinor/fusion-framework-module';
import {
  IModuleLoaderConfigConfigurator,
  ModuleLoaderConfigConfigurator,
} from './module-configurator';
import { IModuleProvider, ModuleProvider } from './module-provider';

export type ModuleLoader<TModule extends ModuleLoaderType> = Module<
  TModule,
  IModuleProvider,
  IModuleLoaderConfigConfigurator,
  []
>;

export type ModuleLoaderType = 'appLoader' | 'moduleLoader' | 'widgetLoader';

export function configureModuleLoader<TModule extends ModuleLoaderType>(
  name: TModule,
  urlGenerator: (moduleId: string) => string
): {
  module: ModuleLoader<TModule>;
} {
  const config = new ModuleLoaderConfigConfigurator();
  config.urlGenerator = urlGenerator;
  return {
    module: {
      name,
      configure: () => config,
      initialize: async ({ config, requireInstance, hasModule }) => {
        // if (await requireInstance('portal')) {
        // }
        return new ModuleProvider(config);
        // may need http client here !!
      },
    },
  };
}

declare module '@equinor/portal-core' {
  interface Modules {
    appLoader: ModuleLoader<'appLoader'>;
    widgetLoader: ModuleLoader<'widgetLoader'>;
  }
}
