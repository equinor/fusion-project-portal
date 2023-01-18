import React from 'react';
import { useBookmarkGrouping, useDelete } from '../../hooks';
import { Bookmark } from '../../types';
import { Row } from '../row/Row';
import { Section } from '../section/Section';
import { SharedIcon } from '../shared/SharedIcon';
type SectionList = {
  bookmarkGroups: ReturnType<typeof useBookmarkGrouping>['bookmarkGroups'];
};
export function SectionList({ bookmarkGroups }: SectionList) {
  const { mutate } = useDelete();

  const createMenuOptions = (id: string) => [
    { name: 'Delete', disabled: false, onClick: () => mutate(id) },
  ];
  return (
    <>
      {bookmarkGroups
        .filter(filterEmptyGroups)
        .map(({ groupingProperty: group, values }) => (
          <Section key={group} name={group}>
            {values
              .sort(sortByName)
              .map(({ name, id, isShared, createdBy }) => (
                <Row menuOptions={createMenuOptions(id)} key={id} name={name}>
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
    </>
  );
}

/** Helpers.. */
const filterEmptyGroups = (i: { values: Bookmark[] }) => i.values.length;
const sortByName = (a: Bookmark, b: Bookmark) => a.name.localeCompare(b.name);
const extractNameFromMail = (mail: string) => mail.split('@')[0].toLowerCase();
