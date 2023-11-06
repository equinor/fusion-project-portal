import { useCurrentUser, useCurrentUserPhoto } from '@portal/core';
import { Avatar, getAccountTypeColor } from '@portal/ui';

export const TopBarAvatar = (): JSX.Element | null => {
	const { data: url } = useCurrentUserPhoto();
	const currentUser = useCurrentUser();
	return <Avatar url={url} borderColor={getAccountTypeColor(currentUser.data?.accountType)} />;
};
