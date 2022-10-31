import {
  AnyModule,
  ModuleInitializerArgs,
} from '@equinor/fusion-framework-module';
import { HttpMsalModule } from '@equinor/fusion-framework-module-http';
import { WorkSurfaceOptions } from './client/client';
import { WorkSurface } from './types';

export interface IWorkSurfaceModuleConfig {
  getWorkSurface: WorkSurfaceOptions;
}

export interface IWorkSurfaceModuleConfigurator<
  TDeps extends Array<AnyModule> = [HttpMsalModule]
> {
  /** fired on initialize of module */
  createConfig: (
    args: ModuleInitializerArgs<IWorkSurfaceModuleConfigurator, TDeps>
  ) => Promise<IWorkSurfaceModuleConfig>;

  /** fired on initialize of module */
  createWorkSurfaceClientGet(
    init: ModuleInitializerArgs<
      IWorkSurfaceModuleConfigurator,
      [HttpMsalModule]
    >
  ): Promise<(id: string) => Promise<WorkSurface>>;
}

export class WorkSurfaceModuleConfigurator
  implements IWorkSurfaceModuleConfigurator<[HttpMsalModule]>
{
  getWorkSurface?: () => Promise<WorkSurface>;

  defaultExpireTime = 1 * 60 * 1000;

  public async createWorkSurfaceClientGet(
    init: ModuleInitializerArgs<
      IWorkSurfaceModuleConfigurator,
      [HttpMsalModule]
    >
  ): Promise<(id: string) => Promise<WorkSurface>> {
    const provider = await init.requireInstance('http');
    const client = provider.createClient('portal');
    return (id: string) => client.fetch(`work-surfaces/${id}`);
  }

  public async createConfig(
    init: ModuleInitializerArgs<
      IWorkSurfaceModuleConfigurator,
      [HttpMsalModule]
    >
  ) {
    const config = {
      getWorkSurface: {
        query: {
          client: await this.createWorkSurfaceClientGet(init),
          key: () => 'work-surfaces',
          expire: 0,
        },
      },
    } as IWorkSurfaceModuleConfig;

    return config;
  }
}

export default WorkSurfaceModuleConfigurator;
