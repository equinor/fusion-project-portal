import { Icon, Snackbar } from '@equinor/eds-core-react';
import {
  DeleteMutationArgs,
  FavouriteMutationArgs,
  ShareMutationArgs,
  useBookmarkGrouping,
  useDelete,
  useFavourite,
  useShare,
} from '../../hooks';
import { Bookmark } from '../../types';
import { Row } from '../row/Row';
import { Section } from '../section/Section';
import { SharedIcon } from '../shared/SharedIcon';
import { UseMutateFunction } from 'react-query';
import { useState } from 'react';

type SectionList = {
  bookmarkGroups: ReturnType<typeof useBookmarkGrouping>['bookmarkGroups'];
};
export function SectionList({ bookmarkGroups }: SectionList) {
  const { mutate: deleteMutation } = useDelete();
  const { mutate: favouriteMutation } = useFavourite();

  const [isOpen, setIsOpen] = useState(false);

  const { mutate: shareMutation } = useShare(({ isShared, id }) => {
    if (!isShared) return;
    navigator.clipboard.writeText(appendBookmarkIdToUrl(id));
    //Open snackbar
    setIsOpen(true);
  });

  const createMenuOptions = (bm: Bookmark) =>
    createBookmarkActions(bm, [
      deleteMutation,
      shareMutation,
      favouriteMutation,
    ]);

  return (
    <>
      {bookmarkGroups
        .filter(filterEmptyGroups)
        .map(({ groupingProperty, values }) => (
          <Section
            key={groupingProperty}
            name={toHumanReadable(groupingProperty)}
          >
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
      <Snackbar
        autoHideDuration={2000}
        onClose={() => setIsOpen(false)}
        open={isOpen}
      >
        Bookmark url copied to clipboard
      </Snackbar>
    </>
  );
}

function createBookmarkActions(
  { id, isShared, isMine }: Bookmark,
  [deleteMutation, shareMutation, favoriteMutation]: [
    UseMutateFunction<Response, unknown, DeleteMutationArgs, unknown>,
    UseMutateFunction<Response, unknown, ShareMutationArgs, unknown>,
    UseMutateFunction<Response, unknown, FavouriteMutationArgs, unknown>
  ]
) {
  if (isMine) {
    return [
      {
        name: 'Remove',
        disabled: false,
        onClick: () => deleteMutation({ id }),
        Icon: <Icon name="close" />,
      },
      {
        name: isShared ? 'Unshare' : 'Share',
        disabled: false,
        onClick: () => shareMutation({ id, unShare: isShared }),
        Icon: <Icon name="share" />,
      },
    ];
  } else {
    return [
      {
        name: 'Unfavourite',
        disabled: false,
        onClick: () => favoriteMutation({ id, unFavourite: true }),
        Icon: <Icon name="close" />,
      },
    ];
  }
}

/** Helpers.. */
const filterEmptyGroups = (i: { values: Bookmark[] }) => i.values.length;
const sortByName = (a: Bookmark, b: Bookmark) => a.name.localeCompare(b.name);
const extractNameFromMail = (mail: string) => mail.split('@')[0].toLowerCase();

const toHumanReadable = (val: string) =>
  val
    .split('-')
    .map((s) => `${s[0].toUpperCase()}${s.slice(1)}`)
    .join(' ');

/**Appends bookmarkId to current url */
function appendBookmarkIdToUrl(id: string): string {
  const url = new URL(window.location.toString());
  url.searchParams.set('bookmarkId', id);
  return url.toString();
}
