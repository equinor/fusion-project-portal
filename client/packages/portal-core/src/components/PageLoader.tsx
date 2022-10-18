import { ModuleLoader } from './ModuleLoader';

export interface PageLoaderProps<TModules> {
  pageId: string;
  modules?: TModules;
}

export function PageLoader<TModules>({ pageId }: PageLoaderProps<TModules>) {
  return <ModuleLoader moduleId={pageId} />;
}
