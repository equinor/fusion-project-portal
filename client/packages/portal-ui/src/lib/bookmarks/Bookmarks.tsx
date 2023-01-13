import { InfoMessage } from '../info-message/InfoMessage';
import { SideSheetHeader } from '../../../../service-message/components/side-sheet-header.tsx/SideSheetHeader';

export function Bookmarks() {
  return (
    <SideSheetHeader
      title="Bookmarks"
      subTitle="Application bookmarks"
      color={'#258800'}
    >
      <InfoMessage>This functionality is not yet implemented.</InfoMessage>
    </SideSheetHeader>
  );
}
