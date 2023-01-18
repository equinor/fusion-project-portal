import { useFramework } from '@equinor/fusion-framework-react';
import { useMutation, useQueryClient } from 'react-query';
import { bookmarksKey } from './useBookmarks';
import { createBookmarkClient } from '../api/bookmark';

export function useDelete() {
  const disco = useFramework().modules.serviceDiscovery;
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [bookmarksKey],
    mutationFn: async (id: string) =>
      createBookmarkClient(await disco.createClient('bookmarks')).delete(id),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: bookmarksKey });
    },
  });
}
