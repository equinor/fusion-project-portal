import { useCurrentUser } from '@equinor/fusion-framework-react/hooks';
import { InfoMessage } from '../info-message/InfoMessage';
import { SideSheetHeader } from '../side-sheet-header.tsx/SideSheetHeader';

export function MyAccount() {
  const user = useCurrentUser();

  return (
    <SideSheetHeader
      title="My Account"
      subTitle={user?.username || ''}
      color={'#258800'}
    >
      <InfoMessage>This functionality is not yet implemented.</InfoMessage>
    </SideSheetHeader>
  );
}
