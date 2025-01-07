import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useQuery } from '@tanstack/react-query';
import { checkOptionsRequest, OptionRequestResult } from '../optionRequestChecker';
import { AccessArgs, AccessType, getOptionsUrlByType } from '../accessMap';

export const useAccess = <T extends AccessType>(args: AccessArgs<T>) => {
	const client = useHttpClient('portal-client');

	const uri = getOptionsUrlByType(args);

	const query = useQuery<OptionRequestResult>({
		queryKey: ['portal-access', uri],
		queryFn: async () => {
			const response = await client.fetch(uri || '', {
				method: 'OPTIONS',
			});
			return checkOptionsRequest(response);
		},
		enabled: Boolean(uri),
	});

	return {
		...query.data,
		isCheckingAccess: query.isLoading || query.data === undefined,
	};
};
