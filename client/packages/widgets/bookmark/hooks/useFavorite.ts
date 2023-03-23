import { useFramework } from '@equinor/fusion-framework-react';
import { useMutation, useQueryClient } from 'react-query';
import { createBookmarkClient } from '../api/bookmark';
import { bookmarksKey } from './useBookmarks';

export type FavouriteMutationArgs = {
  id: string;
  unFavourite?: boolean;
};

export function useFavourite() {
  const disco = useFramework().modules.serviceDiscovery;
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [bookmarksKey, 'favourite'],
    mutationFn: async ({ id, unFavourite: unShare }: FavouriteMutationArgs) =>
      createBookmarkClient(await disco.createClient('bookmarks'))[
        unShare ? 'unFavourite' : 'favourite'
      ](id),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: bookmarksKey });
    },
  });
}
