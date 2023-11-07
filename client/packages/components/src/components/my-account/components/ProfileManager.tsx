import { useUser } from '@portal/core';
import { PersonDetails } from '@portal/types';

import { ProfileCardHeader } from './ProfileCardHeader';
import { Typography } from '@equinor/eds-core-react';

export const ProfileManagerCard = ({ user }: { user?: PersonDetails }) => {
	const { data } = useUser(user?.managerAzureUniqueId);
	return (
		<>
			<Typography variant="h6">Manager</Typography>
			<ProfileCardHeader user={data} />
		</>
	);
};
