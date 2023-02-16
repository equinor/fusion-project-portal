import { InfoMessage } from '../info-message/InfoMessage';
import { SideSheetHeader } from '../side-sheet-header/SideSheetHeader';


export function Help() {
  return (
    <SideSheetHeader
      title="Help"
      subTitle="Portal help center"
      color={'#258800'}
    >
      <InfoMessage>This functionality is not yet implemented.</InfoMessage>
    </SideSheetHeader>
  );
}
