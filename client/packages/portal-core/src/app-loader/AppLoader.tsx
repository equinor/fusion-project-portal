
import { useParams } from 'react-router-dom';
import AppModuleLoader from './AppModuleLoader';

export const AppLoader = () => {
  const { appKey } = useParams();

  if (appKey) {
    return <AppModuleLoader appKey={appKey} />;
  }
  return <p> No app key provided.</p >
}
