import { PortalActionProps } from '@equinor/portal-core';
import { SideSheet } from '@equinor/fusion-react-side-sheet';
import { Tasks } from './work-assigned/Tasks';

export function Task({ action, onClose, open }: PortalActionProps) {
	const subTitle = action.subTitle || '';
	return (
		<SideSheet isOpen={open} onClose={onClose} isDismissable={true} minWidth={action.minWidth}>
			<SideSheet.Indicator color={action.color} />
			<SideSheet.Title title={action.name} />
			<SideSheet.SubTitle subTitle={subTitle} />
			<SideSheet.Content>
				<Tasks />
			</SideSheet.Content>
		</SideSheet>
	);
}
