import { useQuery } from 'react-query';
import { useViewController } from '../../current-view-context/CurrentViewContext';
import { useFrameworkCurrentContext, usePortalClient } from '../../hooks';
import { getViewById } from '../portal';

export const useCurrentView = () => {
  const id = useViewController().currentView?.id;
  const currentContext = useFrameworkCurrentContext();

  const client = usePortalClient();

  return useQuery({
    queryKey: ['view', { id, externalId: currentContext?.externalId }],
    queryFn: () => getViewById(client, id, currentContext?.externalId),
  });
};
