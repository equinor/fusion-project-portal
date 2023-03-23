import { Search, Autocomplete } from '@equinor/eds-core-react';
import React from 'react';
import styled from 'styled-components';
import { GroupingKeys } from '../../hooks/useBookmarkGrouping';

type BookmarkFilterProps = {
  searchText: string;
  setSearchText: (newVal: string | null) => void;
  setGroupBy: (groupBy: GroupingKeys) => void;
  groupingModes: string[];
  groupBy: string;
};

export function BookmarkFilter({
  searchText,
  setGroupBy,
  setSearchText,
  groupingModes,
  groupBy,
}: BookmarkFilterProps) {
  return (
    <StyledRow>
      <Search
        placeholder="Search in my bookmarks"
        value={searchText ?? ''}
        onChange={(e) => {
          setSearchText(
            !!e.currentTarget.value.length ? e.currentTarget.value : null
          );
        }}
      />
      <Autocomplete
        options={groupingModes}
        selectedOptions={[groupBy]}
        multiple={false}
        hideClearButton
        autoWidth
        onOptionsChange={(changes) =>
          setGroupBy(changes.selectedItems[0] as any)
        }
        label={''}
      />
    </StyledRow>
  );
}

const StyledRow = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  gap: 0.5em;
`;
