import { SideSheetHeader } from '../side-sheet-header.tsx/SideSheetHeader';
import { BookmarkWidget } from '../../../../bookmarkManager';
import { useFrameworkCurrentContext } from '@equinor/portal-core';

export function Bookmarks() {
  const context = useFrameworkCurrentContext();
  return (
    <SideSheetHeader
      title="Bookmarks"
      subTitle={context ? context.title ?? 'Unknown' : 'No context'}
      color={'#258800'}
    >
      <BookmarkWidget />
    </SideSheetHeader>
  );
}
