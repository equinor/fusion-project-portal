import { PortalActionProps } from '@equinor/portal-core';

import SideSheet from '@equinor/fusion-react-side-sheet';
import { Notifications as NotificationComponent } from './components/Notifications';

import { NotificationActions } from './components/NotificationActions';

export function Notifications({ action, onClose, open }: PortalActionProps) {
	const subTitle = action.subTitle || '';

	return (
		<SideSheet isOpen={open} onClose={onClose} isDismissable={true} minWidth={action.minWidth}>
			<SideSheet.Indicator color={action.color} />
			<SideSheet.Title title={action.name} />
			<SideSheet.SubTitle subTitle={subTitle} />
			<SideSheet.Actions>
				<NotificationActions />
			</SideSheet.Actions>
			<SideSheet.Content>
				<NotificationComponent />
			</SideSheet.Content>
		</SideSheet>
	);
}
