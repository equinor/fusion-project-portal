import {
  useCurrentUser,
  useHttpClient,
} from '@equinor/fusion-framework-react/hooks';
import { useQuery } from 'react-query';
import { getPresence } from '../fusion/getPresence';

export const usePresence = () => {
  const client = useHttpClient('people' as 'portal');
  const currentUser = useCurrentUser();

  return useQuery({
    queryKey: ['presence'],
    queryFn: () => getPresence(client, currentUser?.localAccountId ?? ''),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
