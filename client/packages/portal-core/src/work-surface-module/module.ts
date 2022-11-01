import { Module } from '@equinor/fusion-framework-module';

import { EventModule } from '@equinor/fusion-framework-module-event';
import { HttpMsalModule } from '@equinor/fusion-framework-module-http';
import WorkSurfaceModuleConfigurator, {
  IWorkSurfaceModuleConfigurator,
} from './configurator';
import WorkSurfaceProvider, { IWorkSurfaceProvider } from './provider';

export type WorkSurfaceModuleKey = 'work-surface';

export const moduleKey: WorkSurfaceModuleKey = 'work-surface';

export type WorkSurfaceModule = Module<
  WorkSurfaceModuleKey,
  IWorkSurfaceProvider,
  IWorkSurfaceModuleConfigurator,
  [HttpMsalModule, EventModule]
>;

export const module: WorkSurfaceModule = {
  name: moduleKey,
  configure: () => new WorkSurfaceModuleConfigurator(),
  initialize: async (args) => {
    const config = await args.config.createConfig(args);
    const event = args.hasModule('event')
      ? await args.requireInstance('event')
      : undefined;
    return new WorkSurfaceProvider({ config, event });
  },
};

export default module;
