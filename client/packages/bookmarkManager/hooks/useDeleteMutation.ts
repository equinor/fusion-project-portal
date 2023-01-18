import { useFramework } from '@equinor/fusion-framework-react';
import { useMutation, useQueryClient } from 'react-query';
import { bookmarksKey } from './useBookmarks';

export function useDelete() {
  const promiseClient =
    useFramework().modules.serviceDiscovery.createClient('bookmarks');

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [bookmarksKey],
    mutationFn: async (id: string) => {
      await promiseClient;
      return (await promiseClient).fetch(`bookmarks/${id}`, {
        method: 'DELETE',
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: bookmarksKey });
    },
  });
}
