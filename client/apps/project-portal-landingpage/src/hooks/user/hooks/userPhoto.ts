import { useCurrentUser } from '@equinor/fusion-framework-react/hooks';
import * as userQueries from './useUserQueries';

export const useUserPhoto = (userId?: string) => {
	return userQueries.useUserPhotoQuery(userId);
};

export const useCurrentUserPhoto = () => {
	const user = useCurrentUser();
	return userQueries.useUserPhotoQuery(user?.localAccountId);
};
