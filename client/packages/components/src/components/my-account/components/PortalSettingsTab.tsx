import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { Style } from './MyRolesTab';
import { PersonDetails } from '@portal/types';
import { arrow_back } from '@equinor/eds-icons';
import { InfoMessage } from '@equinor/portal-ui';

export const PortalSettingsTab = ({ onClick }: { onClick: VoidFunction; user?: PersonDetails }) => {
	return (
		<Style.Wrapper>
			<Style.TopWrapper>
				<Button variant="ghost_icon" onClick={onClick}>
					<Icon data={arrow_back} />
				</Button>

				<Typography>Portal Settings</Typography>
			</Style.TopWrapper>
			<InfoMessage>This functionality is not yet implemented.</InfoMessage>
		</Style.Wrapper>
	);
};
