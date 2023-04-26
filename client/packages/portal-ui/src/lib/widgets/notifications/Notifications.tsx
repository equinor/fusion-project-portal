import { PortalActionProps } from '@equinor/portal-core';
import { InfoMessage } from '../../info-message/InfoMessage';
import SideSheet from '@equinor/fusion-react-side-sheet';

export function Notifications({ action, onClose, open }: PortalActionProps) {
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
			<SideSheet.SubTitle subTitle={action.subTitle!} />
			<SideSheet.Content>
				<InfoMessage>This functionality is not yet implemented.</InfoMessage>;
			</SideSheet.Content>
		</SideSheet>
	);
}
