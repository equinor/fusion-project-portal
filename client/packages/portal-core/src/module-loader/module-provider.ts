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

export interface IModuleProvider {
  loadModule: <TModules extends Array<AnyModule>, TConfig, TProps>(
    moduleId: string,
    element: HTMLDivElement,
    ModuleEnv?: ModuleEnv<TModules, TConfig, TProps>
  ) => Promise<(() => void) | undefined>;
}

export class ModuleProvider implements IModuleProvider {
  private _modulePathProvider: (moduleId: string) => string;

  constructor(protected _config: IModuleLoaderConfigConfigurator) {
    this._modulePathProvider = _config.urlGenerator;
  }

  loadModule = async <TModules extends Array<AnyModule>, TConfig, TProps>(
    moduleId: string,
    element?: HTMLDivElement,
    ModuleEnv?: ModuleEnv<TModules, TConfig, TProps>
  ) => {
    const loadedModule = await this._loadModuleByModulePath(
      await this._modulePathProvider(moduleId)
    );

    if (loadedModule && element) {
      return loadedModule(element, ModuleEnv);
    } else {
      throw new Error(
        'could not load application, module or element is not valid'
      );
    }
  };

  private _loadModuleByModulePath = async (modulePath: string) => {
    const { render, default: moduleRender } = await import(
      /* @vite-ignore */ modulePath
    );

    if (typeof render === 'function') {
      return render;
    } else if (typeof moduleRender === 'function') {
      return moduleRender;
    } else {
      console.warn('This is not a valid fusion application');
    }
  };
}
