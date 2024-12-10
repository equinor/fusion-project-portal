import { Card } from '@equinor/eds-core-react';
import { useCurrentUserInfo } from './hooks/useCurrentUserInfo';
import { ProfileCardHeader } from './profile-card-header/ProfileCardHeader';

export const User = () => {
	const { currentUserInfo } = useCurrentUserInfo();

	return (
		<Card elevation="raised">
			<ProfileCardHeader user={currentUserInfo} trigger="click" />
		</Card>
	);
};
