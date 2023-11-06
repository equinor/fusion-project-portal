import { useUser } from '@portal/core';
import { PersonDetails } from '@portal/types';

import { ProfileCardHeader } from './ProfileCardHeader';

export const ProfileManagerCard = ({ user }: { user?: PersonDetails }) => {
	const { data } = useUser(user?.managerAzureUniqueId);
	return <ProfileCardHeader user={data} />;
};
