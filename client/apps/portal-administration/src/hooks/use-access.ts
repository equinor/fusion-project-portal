import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useQuery } from '@tanstack/react-query';

export const useAccess = () => {
	const client = useHttpClient('portal-client');

	return useQuery<boolean>({
		queryKey: ['portal-admin'],
		queryFn: async () => {
			const response = await client.fetch('api/profile/admin', {
				method: 'OPTIONS',
			});
			if (response.ok) {
				return true;
			}
			return false;
		},
	});
};
