/**
 * ##ModuleLoaderConfigConfigurator
 *
 * client uri for fusion portal for app loading
 * http client for  loading of application manifest
 *
 */

export interface IModuleLoaderConfigConfigurator {
  generateUrl(appKey: string): string;
}

export class ModuleLoaderConfigConfigurator
  implements IModuleLoaderConfigConfigurator
{
  public generateUrl(appKey: string): string {
    return `appKey`;
  }
}
