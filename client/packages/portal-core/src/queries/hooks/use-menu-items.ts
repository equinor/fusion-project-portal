import { useQuery, UseQueryResult } from 'react-query';
import { useViewController } from '../../current-view-context/CurrentViewContext';
import { useFrameworkCurrentContext, usePortalClient } from '../../hooks';
import { AppGroup } from '../../types';
import { getAppGroups } from '../portal/getAppGroups';

export const useMenuItems = (): UseQueryResult<[] | AppGroup[]> => {
  const id = useViewController().currentView?.id;
  const currentContext = useFrameworkCurrentContext();

  const client = usePortalClient();

  return useQuery({
    queryKey: ['appGroups', { id, externalId: currentContext?.externalId }],
    queryFn: () => getAppGroups(client, id, currentContext?.externalId),
  });
};
