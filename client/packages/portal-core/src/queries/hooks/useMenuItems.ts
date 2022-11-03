import { useQuery } from 'react-query';
import { useCurrentWorkSurfaceId } from '../../currentWorkSurfaceContext/CurrentViewContext';
import { usePortalClient } from '../../hooks/use-portal-client';
import { getMenuItems } from '../portal/getMenuItems';

export const useMenuItems = () => {
  const id = useCurrentWorkSurfaceId().getId();
  const client = usePortalClient();

  return useQuery({
    queryKey: ['menu-items', id],
    queryFn: () => getMenuItems(client, id),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
