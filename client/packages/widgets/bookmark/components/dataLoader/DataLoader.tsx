import { useBookmarks, useBookmarkGrouping } from '../../hooks';
import { BookmarkFilter } from '../filter/Filter';
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
    <div style={{ width: '95%' }}>
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
