import { useQuery, useQueryClient } from 'react-query';
import { bookmarksKey } from './useBookmarks';
import { createBookmarkClient } from '../api/bookmark';
import {
  useCurrentUser,
  useFramework,
} from '@equinor/fusion-framework-react-app/framework';
import { Bookmark } from '../types';

export function useGetBookmarkById(id: string) {
  const disco = useFramework().modules.serviceDiscovery;

  const user = useCurrentUser();

  return useQuery({
    queryKey: [bookmarksKey, id],
    queryFn: async () =>
      createBookmarkClient(await disco.createClient('bookmarks')).getById(id),
    select: (e): Bookmark => ({
      ...e,
      isMine: e.createdBy.azureUniqueId === user?.localAccountId,
    }),
  });
}
