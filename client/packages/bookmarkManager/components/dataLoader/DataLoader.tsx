import { CircularProgress } from '@equinor/eds-core-react';
import React from 'react';
import { useBookmarks, useBookmarkGrouping, useDelete } from '../../hooks';
import { Bookmark } from '../../types';
import { BookmarkFilter } from '../filter/Filter';
import { Header } from '../header';
import { Row } from '../row/Row';
import { Section } from '../section/Section';
import { SharedIcon } from '../shared/SharedIcon';

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

  const { mutate } = useDelete();

  const createMenuOptions = (id: string) => [
    { name: 'Delete', disabled: false, onClick: () => mutate(id) },
  ];

  return (
    <div>
      <Header />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          <BookmarkFilter
            groupBy={groupBy}
            groupingModes={Object.keys(groupingModes)}
            searchText={searchText ?? ''}
            setGroupBy={setGroupBy}
            setSearchText={setSearchText}
          />
          {bookmarkGroups
            .filter(filterEmptyGroups)
            .map(({ groupingProperty: group, values }) => (
              <Section key={group} name={group}>
                {values
                  .sort(sortByName)
                  .map(({ name, id, isShared, createdBy }) => (
                    <Row
                      menuOptions={createMenuOptions(id)}
                      key={id}
                      name={name}
                    >
                      {isShared && (
                        <SharedIcon
                          createdById={createdBy.azureUniqueId}
                          createdBy={extractNameFromMail(createdBy.mail)}
                        />
                      )}
                    </Row>
                  ))}
              </Section>
            ))}
        </div>
      )}
    </div>
  );
}

/** Helpers.. */
const filterEmptyGroups = (i: { values: Bookmark[] }) => i.values.length;
const sortByName = (a: Bookmark, b: Bookmark) => a.name.localeCompare(b.name);
const extractNameFromMail = (mail: string) => mail.split('@')[0].toLowerCase();
