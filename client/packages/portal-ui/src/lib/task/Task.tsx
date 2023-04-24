import { Tasks } from './work-assigned/WorkAssigned';

import { PortalActionProps } from '@equinor/portal-core';

import { SideSheet } from '@equinor/fusion-react-side-sheet';

export function Task({ action, onClose, open }: PortalActionProps) {
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
				<Tasks />
			</SideSheet.Content>
		</SideSheet>
	);
}
