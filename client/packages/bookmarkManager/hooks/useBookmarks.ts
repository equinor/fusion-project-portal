import { useQuery } from 'react-query';
import { useFramework } from '@equinor/fusion-framework-react';
import { Bookmark } from '../types';

export const useBookmarks = () => {
  const client =
    useFramework().modules.serviceDiscovery.createClient('bookmarks');

  return useQuery<Bookmark[], Response>(['bookmarks'], {
    queryFn: async () => {
      const res = await (await client).fetch('persons/me/bookmarks');

      if (!res.ok) {
        throw res;
      }

      return res.json();
    },
  });
};
