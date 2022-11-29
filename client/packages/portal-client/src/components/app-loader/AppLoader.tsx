import { useParams } from 'react-router-dom';
import { ModuleLoader } from '../app-module-loader/AppModuleLoader';

export function AppLoader() {
  const { appKey } = useParams();
  // Todo Add fallback and verify app key for current context and work surface
  if (appKey) return <ModuleLoader moduleId={appKey} />;
  return <p>No module Found</p>;
}
