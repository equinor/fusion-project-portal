import { useContext, useEffect, useState } from 'react';

export const useFrequentApps = (count = 10) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [frequentAppsIds, setFrequentAppsIds] = useState<string[]>([]);
	const [error, setError] = useState<Error | null>(null);

	const fetchFrequentApps = async (signal: AbortSignal) => {
		setLoading(true);
		try {
			// const result = await apiClients.fusion.getAsync<FrequentApp[]>(`/api/persons/${user.id}/frequent-apps`, {
			//   signal,
			// });
			// const data = result.data.slice(0, count).map((app) => app.key) as string[];
			// setFrequentAppsIds(data);
		} catch (error) {
			setError(error as Error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;

		fetchFrequentApps(signal);

		return () => {
			controller.abort();
		};
	}, []);

	return {
		loading,
		frequentAppsIds,
		error: error || null,
	};
};

export default useFrequentApps;
