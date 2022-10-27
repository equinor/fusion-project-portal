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
  generateUrl: (moduleId: string) => string
): {
  module: ModuleLoader<TModule>;
} {
  const config = new ModuleLoaderConfigConfigurator();
  config.generateUrl = generateUrl;
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
    moduleLoader: ModuleLoader<'moduleLoader'>;
    appLoader: ModuleLoader<'appLoader'>;
    widgetLoader: ModuleLoader<'widgetLoader'>;
  }
}
