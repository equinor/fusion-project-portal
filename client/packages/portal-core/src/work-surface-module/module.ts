import { Module } from '@equinor/fusion-framework-module';

import { EventModule } from '@equinor/fusion-framework-module-event';
import { HttpMsalModule } from '@equinor/fusion-framework-module-http';
import { BehaviorSubject } from 'rxjs';
import WorkSurfaceModuleConfigurator, {
  IWorkSurfaceModuleConfigurator,
} from './configurator';
import WorkSurfaceProvider, { IWorkSurfaceProvider } from './provider';

export const workSurfaceProvider$ =
  new BehaviorSubject<WorkSurfaceProvider | null>(null);

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
    const provider = new WorkSurfaceProvider({ config, event });
    workSurfaceProvider$.next(provider);
    return provider;
  },
};

export default module;
