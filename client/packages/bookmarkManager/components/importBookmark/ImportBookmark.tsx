import { Button, Dialog } from '@equinor/eds-core-react';
import React, { useEffect, useState } from 'react';

import { useBookmarks, useFavourite, useGetBookmarkById } from '../../hooks';

export function ImportBookmarkModal() {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate } = useFavourite();

  const id =
    new URL(window.location.toString()).searchParams.get('bookmarkId') ?? '';

  const { data: all } = useBookmarks();
  const { data: target } = useGetBookmarkById(id);

  useEffect(() => {
    if (!all || !target) return;

    if (all?.findIndex(({ id }) => id === target.id) === -1) {
      setIsOpen(true);
    }
  }, [all, target]);

  return (
    <Dialog style={{ width: '500px' }} open={isOpen}>
      <Dialog.Header>Import bookmark</Dialog.Header>
      <Dialog.Content>
        <p>This bookmark was created by {target?.createdBy.name}</p>
        <p>Would you like to import it?</p>
      </Dialog.Content>
      <Dialog.Actions>
        <div style={{ display: 'flex', gap: '0.2em' }}>
          <Button
            onClick={() => setIsOpen(false)}
            variant={'ghost'}
            style={{ width: '70px' }}
          >
            No
          </Button>
          <Button
            onClick={() => {
              mutate({ id });
              setIsOpen(false);
            }}
            variant="ghost"
          >
            Import
          </Button>
        </div>
      </Dialog.Actions>
    </Dialog>
  );
}
