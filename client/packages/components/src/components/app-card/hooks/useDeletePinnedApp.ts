import { useCallback, useContext, useState } from 'react';

export const useDeletePinnedApp = () => {
	const [deleting, setDeleting] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const deletePinnedApp = useCallback(async (appKey: string) => {
		setDeleting(true);
		try {
			// await apiClients.fusion.deleteAsync(`/api/persons/${user.id}/pinned-apps/${appKey}`);
		} catch (error) {
			setError(error as Error);
		} finally {
			setDeleting(false);
			// setOpenSnackbar({
			//   appKey: appKey,
			//   isAdding: false,
			// });
		}
	}, []);

	return {
		deletePinnedApp,
		deleting,
		error: error || null,
	};
};

export default useDeletePinnedApp;
