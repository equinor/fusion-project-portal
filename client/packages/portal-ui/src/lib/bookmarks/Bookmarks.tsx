import { BookmarkWidget } from '../../../../bookmarkManager';
import { useFrameworkCurrentContext } from '@equinor/portal-core';
import { SideSheetHeader } from '../../../../service-message/components/side-sheet-header.tsx/SideSheetHeader';

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
