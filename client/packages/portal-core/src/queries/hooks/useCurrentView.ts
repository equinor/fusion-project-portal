import { useQuery } from 'react-query';
import { useViewController } from '../../currentWorkSurfaceContext/CurrentViewContext';
import { usePortalClient } from '../../hooks';
import { getMenuItems } from '../portal';

export const useCurrentView = () => {
  const id = useViewController().getId();
  const client = usePortalClient();
  return useQuery({
    queryKey: ['view', id],
    queryFn: () => getMenuItems(client, id),
  });
};
