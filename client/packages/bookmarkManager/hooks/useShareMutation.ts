import { useFramework } from '@equinor/fusion-framework-react';
import { useMutation, useQueryClient } from 'react-query';
import { createBookmarkClient } from '../api/bookmark';
import { Bookmark } from '../types';
import { bookmarksKey } from './useBookmarks';

export type ShareMutationArgs = {
  id: string;
  unShare?: boolean;
};

export function useShare(onSuccess: (bookmark: Bookmark) => void) {
  const disco = useFramework().modules.serviceDiscovery;
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [bookmarksKey, 'share'],
    mutationFn: async ({ id, unShare }: ShareMutationArgs) =>
      createBookmarkClient(await disco.createClient('bookmarks'))[
        unShare ? 'unShare' : 'share'
      ](id),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: bookmarksKey });
    },
    onSuccess: async (e) => {
      onSuccess((await e.json()) as Bookmark);
    },
  });
}
