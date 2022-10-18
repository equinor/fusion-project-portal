import { ModuleLoaderService } from './module-loader';

const moduleLoader = new ModuleLoaderService();

export async function runModule<TModules>(
  moduleId: string,
  ref: HTMLDivElement,
  cb: (teardown: () => void) => void,
  modules?: TModules
) {
  const appRun = await moduleLoader.loadModule(moduleId, ref, modules);
  cb(appRun());
}

export interface ModuleLoaderProps<TModules> {
  moduleId: string;
  modules?: TModules;
}
