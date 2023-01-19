import { useQuery } from 'react-query';
import { useFramework } from '@equinor/fusion-framework-react';
import { useCurrentUser } from '@equinor/fusion-framework-react-app/framework';
import { Bookmark } from '../types';

export const bookmarksKey = 'bookmarks';

export const useBookmarks = () => {
  const client =
    useFramework().modules.serviceDiscovery.createClient('bookmarks');
  const user = useCurrentUser();

  return useQuery<Bookmark[], Response>([bookmarksKey], {
    queryFn: async () => {
      const res = await (await client).fetch('persons/me/bookmarks');

      if (!res.ok) {
        throw res;
      }
      return res.json();
    },
    select: (bookmarks) =>
      bookmarks.map((bookmark) => ({
        ...bookmark,
        isMine: bookmark.createdBy.azureUniqueId === user?.localAccountId,
      })),
  });
};
