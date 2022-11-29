import { InfoMessage } from '../info-message/InfoMessage';
import { SideSheetHeader } from '../side-sheet-header.tsx/SideSheetHeader';

export function Task() {
  return (
    <SideSheetHeader
      title="Task"
      subTitle="Your application related task"
      color={'#258800'}
    >
      <InfoMessage>This functionality is not yet implemented.</InfoMessage>
    </SideSheetHeader>
  );
}
