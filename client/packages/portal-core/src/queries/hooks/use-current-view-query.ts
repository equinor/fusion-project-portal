import { useQuery } from 'react-query';

import { useFrameworkCurrentContext, usePortalClient } from '../../hooks';
import { useViewController } from '../../providers';
import { getViewById } from '../portal';

export const useCurrentViewQuery = () => {
  const id = useViewController().currentView?.id;
  const currentContext = useFrameworkCurrentContext();

  const client = usePortalClient();

  return useQuery({
    queryKey: ['view', { id, externalId: currentContext?.externalId }],
    queryFn: () => getViewById(client, id, currentContext?.externalId),
  });
};
