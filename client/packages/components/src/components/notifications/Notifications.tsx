import { PortalActionProps } from '@equinor/portal-core';

import SideSheet from '@equinor/fusion-react-side-sheet';
import { Notifications as NotificationComponent } from './components/Notifications';
import { Button, Icon } from '@equinor/eds-core-react';
import { more_vertical } from '@equinor/eds-icons';
import { MarkAllAsReadButton } from './components/MarkAllAsReadButton';

export function Notifications({ action, onClose, open }: PortalActionProps) {
	const subTitle = action.subTitle || '';

	return (
		<SideSheet isOpen={open} onClose={onClose} isDismissable={true} minWidth={action.minWidth}>
			<SideSheet.Indicator color={action.color} />
			<SideSheet.Title title={action.name} />
			<SideSheet.SubTitle subTitle={subTitle} />
			<SideSheet.Actions>
				<MarkAllAsReadButton />
				{/* <Button variant="ghost_icon">
					<Icon data={more_vertical} />
				</Button> */}
			</SideSheet.Actions>
			<SideSheet.Content>
				<NotificationComponent />
			</SideSheet.Content>
		</SideSheet>
	);
}
