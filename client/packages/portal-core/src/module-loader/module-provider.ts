/**
 * # Application Loader #
 *
 *  - loadApp
 *  - setElement and hol a reference to dom element
 *  - Verify that dom element exist.
 *  - Run application
 *  - application teardown on application switch.
 *  - validateApp handle error
 *  - loadAppMetadata
 *  - loading feedback
 */

import type { AppManifest, Fusion } from '@equinor/fusion-framework';
import type { AnyModule } from '@equinor/fusion-framework-module';
import { from, Observable } from 'rxjs';
import { IModuleLoaderConfigConfigurator } from './module-configurator';

// Get form fusion framework
export type AppEnv<TConfig = unknown, TProps = unknown> = {
  /** base routing path of the application */
  basename?: string;
  manifest?: AppManifest;
  config?: TConfig;
  props?: TProps;
};

export interface ModuleEnv<
  TModules extends Array<AnyModule>,
  TConfig = unknown,
  TProps = unknown
> {
  fusion: Fusion<TModules>;
  env: AppEnv<TConfig, TProps>;
}

export class ModuleProvider {
  #modulePathProvider: (moduleId: string) => string;

  constructor(protected _config: IModuleLoaderConfigConfigurator) {
    this.#modulePathProvider = _config.urlGenerator;
  }

  public loadModule<TModule = unknown>(moduleId: string): Observable<TModule> {
    return from(
      this.#load(this.#modulePathProvider(moduleId))
    ) as Observable<TModule>;
  }

  #load(modulePath: string) {
    return import(/* @vite-ignore */ modulePath);
  }
}
