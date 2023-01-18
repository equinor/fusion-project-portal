import { useState } from 'react';
import { Bookmark } from '../types';
import { useBookmarks } from './useBookmarks';

export type GroupingKeys = 'Group by app' | 'Created by' | 'App groups';

const groupingModes: Record<GroupingKeys, (item: Bookmark) => string> = {
  'Group by app': (item: Bookmark) => item.appKey,
  'Created by': (item: Bookmark) => item.createdBy.name,
  'App groups': (item: Bookmark) => item?.sourceSystem?.subSystem ?? 'Unknown',
} as const;

export function useBookmarkGrouping() {
  const { data, isLoading, error } = useBookmarks();
  const [searchText, setSearchText] = useState<string | null>(null);

  const [groupBy, setGroupBy] =
    useState<keyof typeof groupingModes>('Group by app');

  const bookmarkGroups =
    data
      ?.map(groupingModes[groupBy])
      .filter((v, i, a) => a.indexOf(v) === i)
      .map((groupingProperty) => ({
        groupingProperty,
        values: data
          .filter((s) => groupingModes[groupBy](s) === groupingProperty)
          .filter((s) => (searchText ? s.name.includes(searchText) : true)),
      })) ?? [];

  return {
    setGroupBy,
    setSearchText,
    searchText,
    bookmarkGroups,
    groupingModes,
    groupBy,
  };
}
