import { InfoMessage } from '../info-message/InfoMessage';
import { SideSheetHeader } from '../side-sheet-header.tsx/SideSheetHeader';
import { BookmarkWidget } from '../../../../bookmarkManager';

export function Bookmarks() {
  return (
    <SideSheetHeader
      title="Bookmarks"
      subTitle="Application bookmarks"
      color={'#258800'}
    >
      <BookmarkWidget close={() => void 0} isOpen />
    </SideSheetHeader>
  );
}
