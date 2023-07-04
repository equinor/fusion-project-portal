import { useOnboardedContexts } from '@equinor/portal-core';
import { Button, Dialog } from '@equinor/eds-core-react';

export const ViewContextAvailableDialog = ({ title }: { title: string }) => {
	const { hasContext, clearContext } = useOnboardedContexts();
	return (
		<Dialog
			style={{ width: 400 }}
			isDismissable={true}
			open={!hasContext}
			onClose={() => {
				clearContext();
			}}
		>
			<Dialog.Header>{title} not available.</Dialog.Header>
			<Dialog.Content>
				The selected {title.toLowerCase()} is not enabled, please contact a portal administrator
			</Dialog.Content>
			<Dialog.Actions>
				<Button
					onClick={() => {
						clearContext();
					}}
				>
					OK
				</Button>
			</Dialog.Actions>
		</Dialog>
	);
};
