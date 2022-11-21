/**
 * ##ModuleLoaderConfigConfigurator
 *
 * client uri for fusion portal for app loading
 * http client for  loading of application manifest
 *
 */

export interface IModuleLoaderConfigConfigurator {
  urlGenerator(moduleId: string): string;
}

export class ModuleLoaderConfigConfigurator
  implements IModuleLoaderConfigConfigurator
{
  public urlGenerator(moduleId: string): string {
    return moduleId;
  }
}
