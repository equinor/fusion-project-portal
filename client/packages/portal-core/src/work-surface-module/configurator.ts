import {
  AnyModule,
  ModuleInitializerArgs,
} from '@equinor/fusion-framework-module';
import {
  HttpMsalModule,
  IHttpClient,
} from '@equinor/fusion-framework-module-http';

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
    const provider = await init.requireInstance('http');
    const client = provider.createClient('portal-client');

    return { client };
  }
}

export default WorkSurfaceModuleConfigurator;
