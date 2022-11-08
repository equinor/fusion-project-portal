import { useQuery } from 'react-query';
import { useViewController } from '../../currentViewContext/CurrentViewContext';
import { usePortalClient } from '../../hooks';
import { getViewById } from '../portal';

export const useCurrentView = () => {
  const id = useViewController().currentView?.id;
  const client = usePortalClient();
  return useQuery({
    queryKey: ['view', id],
    queryFn: () => getViewById(client, id),
  });
};
