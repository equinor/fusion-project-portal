import { CircularProgress } from '@equinor/eds-core-react';
import React from 'react';
import { useBookmarks, useBookmarkGrouping } from '../../hooks';
import { BookmarkFilter } from '../filter/Filter';
import { Header } from '../header';
import { Loading } from '../loading/Loading';
import { SectionList } from '../sectionList/SectionList';

export function BookmarkDataLoader() {
  const { isLoading } = useBookmarks();
  const {
    bookmarkGroups,
    groupingModes,
    searchText,
    setGroupBy,
    setSearchText,
    groupBy,
  } = useBookmarkGrouping();

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <BookmarkFilter
            groupBy={groupBy}
            groupingModes={Object.keys(groupingModes)}
            searchText={searchText ?? ''}
            setGroupBy={setGroupBy}
            setSearchText={setSearchText}
          />
          <SectionList bookmarkGroups={bookmarkGroups} />
        </div>
      )}
    </div>
  );
}
