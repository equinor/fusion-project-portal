import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FormattedError, PortalConfiguration, PortalConfigurationEditInput } from '../types';
import { getPortalConfigByIdQuery, updatePortalConfigQuery } from '../query/portal-query';

import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useSnackBar } from './use-snack-bar';

export const useGetPortalConfiguration = (portalId?: string) => {
	const client = useHttpClient('portal-client');

	return useQuery<PortalConfiguration, FormattedError>({
		queryKey: ['portal-config', { portalId }],
		queryFn: ({ signal }) => getPortalConfigByIdQuery(client, portalId, signal),
		enabled: Boolean(portalId),
	});
};

export const useUpdatePortalConfig = () => {
	const client = useHttpClient('portal-client');
	const queryClient = useQueryClient();
	const { sendMessage } = useSnackBar();

	return useMutation<boolean, FormattedError, PortalConfigurationEditInput, PortalConfigurationEditInput>({
		mutationKey: ['portal-config'],
		mutationFn: (body) => updatePortalConfigQuery(client, body),
		onError() {
			sendMessage('Failed to update portal', 'Error');
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['portal-config'] });
			sendMessage('Portal updated success', 'Info');
		},
	});
};
