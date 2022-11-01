import {
  AnyModule,
  ModuleInitializerArgs,
} from '@equinor/fusion-framework-module';
import {
  HttpMsalModule,
  IHttpClient,
} from '@equinor/fusion-framework-module-http';
import { WorkSurfaceClientOptions } from './client/workSurfaceClient';
import { WorkSurface } from './types';

export interface IWorkSurfaceModuleConfig {
  client: IHttpClient;
}

export interface IWorkSurfaceModuleConfigurator<
  TDeps extends Array<AnyModule> = [HttpMsalModule]
> {
  /** fired on initialize of module */
  createConfig: (
    args: ModuleInitializerArgs<IWorkSurfaceModuleConfigurator, TDeps>
  ) => Promise<IWorkSurfaceModuleConfig>;
}

export class WorkSurfaceModuleConfigurator
  implements IWorkSurfaceModuleConfigurator<[HttpMsalModule]>
{
  public async createConfig(
    init: ModuleInitializerArgs<
      IWorkSurfaceModuleConfigurator,
      [HttpMsalModule]
    >
  ) {
    const provider = init.requireInstance('http');
    const client = (await provider).createClient('portal');
    console.log(client);
    return { client };
  }
}

export default WorkSurfaceModuleConfigurator;
