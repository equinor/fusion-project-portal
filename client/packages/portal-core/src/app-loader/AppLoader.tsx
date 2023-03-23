
import { useParams } from 'react-router-dom';
import { useCurrentAppGroup } from '../hooks';
import AppModuleLoader from './AppModuleLoader';
import { AppNotAwaitable } from './AppNotAwaitable';

export const AppLoader = () => {
  const { appKey } = useParams();
  const { currentAppGroup } = useCurrentAppGroup(appKey)

  if (!currentAppGroup) {
    return <AppNotAwaitable />;
  }


    if (appKey) {
      return <AppModuleLoader appKey={appKey} />;
    }


  return <p> No app key provided.</p >
}
