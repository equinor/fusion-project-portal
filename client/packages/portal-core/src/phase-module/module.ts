import { Module } from '@equinor/fusion-framework-module';

import { EventModule } from '@equinor/fusion-framework-module-event';
import { HttpMsalModule } from '@equinor/fusion-framework-module-http';
import { MsalModule } from '@equinor/fusion-framework-module-msal';
import WorkSurfaceModuleConfigurator, {
  IWorkSurfaceModuleConfigurator,
} from './configurator';
import { IWorkSurfaceProvider, WorkSurfaceProvider } from './provider';

export type WorkSurfaceModuleKey = 'context';

export const moduleKey: WorkSurfaceModuleKey = 'context';

export type WorkSurfaceModule = Module<
  WorkSurfaceModuleKey,
  IWorkSurfaceProvider,
  IWorkSurfaceModuleConfigurator,
  [HttpMsalModule, MsalModule, EventModule]
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
