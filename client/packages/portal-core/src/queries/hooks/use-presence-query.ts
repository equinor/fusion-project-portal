import {
  useCurrentUser,
} from '@equinor/fusion-framework-react/hooks';
import {
  useFramework,
} from '@equinor/fusion-framework-react';
import { useQuery } from 'react-query';
import { getPresence } from '../fusion/getPresence';

export const usePresenceQuery = () => {
  const client = useFramework().modules.serviceDiscovery.createClient('people');
  const currentUser = useCurrentUser();

  return useQuery({
    queryKey: ['presence'],
    queryFn: async () =>
      getPresence(await client, currentUser?.localAccountId ?? ''),

    refetchInterval: 5 * 1000 * 60,
  });
};
