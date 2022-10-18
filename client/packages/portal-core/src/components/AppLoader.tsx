import { ModuleLoader } from './ModuleLoader';

export interface AppLoaderProps<TModules> {
  applicationId: string;
  modules: TModules;
}

export function ApplicationLoader<TModules>({
  applicationId,
  modules,
}: AppLoaderProps<TModules>) {
  return <ModuleLoader moduleId={applicationId} modules={modules} />;
}
