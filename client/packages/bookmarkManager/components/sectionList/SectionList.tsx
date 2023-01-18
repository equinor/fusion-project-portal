import { useBookmarkGrouping, useDelete, useShare } from '../../hooks';
import { Bookmark } from '../../types';
import { Row } from '../row/Row';
import { Section } from '../section/Section';
import { SharedIcon } from '../shared/SharedIcon';

type SectionList = {
  bookmarkGroups: ReturnType<typeof useBookmarkGrouping>['bookmarkGroups'];
};
export function SectionList({ bookmarkGroups }: SectionList) {
  const { mutate: deleteMutation, error } = useDelete();
  const { mutate: shareMutation } = useShare();

  const createMenuOptions = ({ id, isShared }: Bookmark) => [
    { name: 'Delete', disabled: false, onClick: () => deleteMutation(id) },
    {
      name: isShared ? 'Unshare' : 'Share',
      disabled: false,
      onClick: () => shareMutation({ id, unShare: isShared }),
    },
  ];

  return (
    <>
      {bookmarkGroups
        .filter(filterEmptyGroups)
        .map(({ groupingProperty, values }) => (
          <Section key={groupingProperty} name={groupingProperty}>
            {values.sort(sortByName).map((b) => (
              <Row menuOptions={createMenuOptions(b)} key={b.id} name={b.name}>
                {b.isShared && (
                  <SharedIcon
                    createdById={b.createdBy.azureUniqueId}
                    createdBy={extractNameFromMail(b.createdBy.mail)}
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
