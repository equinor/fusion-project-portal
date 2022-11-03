import { useQuery } from 'react-query';
import { usePortalClient } from '../../hooks/use-portal-client';
import { getViews } from '../portal/getViews';

export const useViews = () => {
  const client = usePortalClient();
  return useQuery({
    queryKey: ['views'],
    queryFn: () => getViews(client),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
