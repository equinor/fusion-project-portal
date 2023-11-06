import * as userQueries from './useUserQueries';

export const useCurrentUser = () => {
	return userQueries.useCurrentUserQuery();
};

export const useUser = (userId?: string) => {
	return userQueries.useUserQuery(userId);
};
