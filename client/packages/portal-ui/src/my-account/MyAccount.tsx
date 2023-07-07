import { useCurrentUser } from '@equinor/fusion-framework-react/hooks';
import { InfoMessage } from '../info-message/InfoMessage';

import { PortalActionProps } from '@equinor/portal-core';

import { SideSheet } from '@equinor/fusion-react-side-sheet';

export function MyAccount({ action, onClose, open }: PortalActionProps) {
	const user = useCurrentUser();

	return (
		<SideSheet
			isOpen={open}
			onClose={onClose}
			isDismissable={true}
			enableFullscreen={true}
			minWidth={action.minWidth}
		>
			<SideSheet.Indicator color={action.color} />
			<SideSheet.Title title={action.name} />
			<SideSheet.SubTitle subTitle={user?.username || ''} />
			<SideSheet.Content>
				<InfoMessage>This functionality is not yet implemented.</InfoMessage>
			</SideSheet.Content>
		</SideSheet>
	);
}
