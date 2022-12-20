import { useParams } from 'react-router-dom';
import AppModuleLoader from './AppModuleLoader';

export function AppLoader() {
  const { appKey } = useParams();
  if (appKey) return <AppModuleLoader appKey={appKey} />;

  return <p>No module Found</p>;
}
