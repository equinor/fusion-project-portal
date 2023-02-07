import { InfoMessage } from "../../info-message/InfoMessage";
import { SideSheetHeader } from "../../side-sheet-header/SideSheetHeader";



export function Notifications() {
  return (
    <SideSheetHeader
      title="Notifications"
      subTitle="Portal notifications center"
      color={'#258800'}
    >
      <InfoMessage>This functionality is not yet implemented.</InfoMessage>
    </SideSheetHeader>
  );
}
