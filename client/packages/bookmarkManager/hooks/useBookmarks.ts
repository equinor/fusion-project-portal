import { useQuery } from "react-query";

export const useBookmarks = () => {
    return useQuery(['bookmarks'], {
      queryFn: async () => {
        const res = await fetch('../');
        return res.json();
      },
    });
  };
  