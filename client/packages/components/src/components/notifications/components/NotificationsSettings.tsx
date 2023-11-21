import { Button, Dialog, Switch, Typography } from '@equinor/eds-core-react';
import { TimePicker } from '@portal/ui';

const config = {
	email: true,
	delayInMinutes: 60,
	appConfig: [
		{
			appKey: 'resources',
			enabled: true,
		},
		{
			appKey: 'query',
			enabled: true,
		},
		{
			appKey: 'meetings',
			enabled: true,
		},
		{
			appKey: 'reviews',
			enabled: true,
		},
	],
};

export const NotificationsSettings = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
	return (
		<div style={{ zIndex: 1 }}>
			<Dialog open={isOpen} isDismissable onClose={onClose} style={{ width: '550px' }}>
				<Dialog.Header>
					<Dialog.Title>Notifications Settings</Dialog.Title>
				</Dialog.Header>
				<Dialog.CustomContent>
					<Typography variant="body_short">General</Typography>
					<Switch title="send-email" label="Send Emails" checked={config.email} />

					<Typography variant="body_short">App e-mail settings</Typography>
					{config.appConfig.map((item) => (
						<Switch title={item.appKey} label={item.appKey.toLocaleUpperCase()} checked={item.enabled} />
					))}
				</Dialog.CustomContent>
				<Dialog.Actions>
					<Button onClick={onClose}>OK</Button>
				</Dialog.Actions>
			</Dialog>
		</div>
	);
};
