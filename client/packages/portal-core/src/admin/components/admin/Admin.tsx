import { PortalActionProps } from '@equinor/portal-core';

import { SideSheet } from '@equinor/fusion-react-side-sheet';

import { Button } from '@equinor/eds-core-react';
import { useIsAdmin } from '../../hooks/useIsAdmin';

export function Admin({ action, onClose, open }: PortalActionProps) {
	const isAdmin = useIsAdmin();
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
			<SideSheet.SubTitle subTitle={action.subTitle || ''} />
			<SideSheet.Actions>
				<Button
					variant="ghost"
					onClick={() => {
						onClose();
					}}
				></Button>
			</SideSheet.Actions>
			<SideSheet.Content>
				<p>{isAdmin ? 'True' : 'False'}</p>
			</SideSheet.Content>
		</SideSheet>
	);
}
