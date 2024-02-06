import { useCallback, useContext, useState } from 'react';

export const usePostPinnedApp = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const postNewPinnedApp = useCallback(async (appKey: string) => {
		setLoading(true);
		try {
			// await apiClients.fusion.postAsync(`/api/persons/${user.id}/pinned-apps`, {
			//   appKey,
			// });
		} catch (error) {
			setError(error as Error);
		} finally {
			setLoading(false);
		}
	}, []);

	return {
		postNewPinnedApp,
		loading,
		error: error || null,
	};
};

export default usePostPinnedApp;
