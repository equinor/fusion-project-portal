import { InfoMessage } from '../info-message/InfoMessage';
import { PortalActionProps } from '@equinor/portal-core';

import { SideSheet } from '@equinor/fusion-react-side-sheet';

export function Help({ action, onClose, open }: PortalActionProps) {
	<SideSheet isOpen={open} onClose={onClose} isDismissable={true} enableFullscreen={true} minWidth={action.minWidth}>
		<SideSheet.Indicator color={action.color} />
		<SideSheet.Title title={action.name} />
		<SideSheet.SubTitle subTitle={action.subTitle!} />
		<SideSheet.Content>
			<InfoMessage>This functionality is not yet implemented.</InfoMessage>
		</SideSheet.Content>
	</SideSheet>;
}
