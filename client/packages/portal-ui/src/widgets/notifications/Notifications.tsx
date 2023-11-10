import { PortalActionProps } from '@equinor/portal-core';
import { Notifications } from '@equinor/notification';
import SideSheet from '@equinor/fusion-react-side-sheet';

export function Notification({ action, onClose, open }: PortalActionProps) {
	const subTitle = action.subTitle || '';
	return (
		<SideSheet isOpen={open} onClose={onClose} isDismissable={true} minWidth={action.minWidth}>
			<SideSheet.Indicator color={action.color} />
			<SideSheet.Title title={action.name} />
			<SideSheet.SubTitle subTitle={subTitle} />
			<SideSheet.Content>
				<Notifications />
			</SideSheet.Content>
		</SideSheet>
	);
}
