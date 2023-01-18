import { InfoMessage } from "../../info-message/InfoMessage";
import { SideSheetHeader } from "../../../../../service-message/components/side-sheet-header.tsx/SideSheetHeader";


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
