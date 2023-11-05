import { Button, Typography } from '@equinor/eds-core-react';
import { Style } from './MyRolesTab';
import { PersonDetails } from '@portal/types';

export const PortalSettingsTab = ({ onClick }: { onClick: VoidFunction; user?: PersonDetails }) => {
	return (
		<Style.Wrapper>
			<Typography>Portal Settings</Typography>
			<Button variant="ghost" fullWidth onClick={onClick}>
				Back
			</Button>
		</Style.Wrapper>
	);
};
