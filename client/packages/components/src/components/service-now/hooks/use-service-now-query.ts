import { useFramework } from '@equinor/fusion-framework-react';
import { useCurrentUser } from '@equinor/fusion-framework-react/hooks';

import { useMutation, useQuery, useQueryClient } from 'react-query';

import { FormattedError, Incident, UploadStatus } from '../types/types';

import { getIncidentsQuery, createIncidentsQuery, uploadAttachments } from '../query/service-now-query';

export const useGetServiceNowIncidents = () => {
	const user = useCurrentUser();
	const client = useFramework().modules.serviceDiscovery.createClient('service-now');

	// const queryClient = useQueryClient();

	return useQuery<Incident[], FormattedError>({
		queryKey: ['service-now-incidents', user?.localAccountId],
		queryFn: async ({ signal }) => getIncidentsQuery(await client, user?.localAccountId, signal),
		enabled: Boolean(user?.localAccountId),
	});
};
export const useCreateServiceNowIncidents = () => {
	const user = useCurrentUser();
	const client = useFramework().modules.serviceDiscovery.createClient('service-now');

	const queryClient = useQueryClient();

	return useMutation<
		Incident,
		FormattedError,
		{ description: string; shortDescription: string; metadata: Record<string, string> },
		Incident
	>({
		mutationKey: ['new-service-now-incidents', user?.localAccountId || ''],
		mutationFn: async (body) => createIncidentsQuery(await client, body, user?.localAccountId),
		onSuccess() {
			queryClient.invalidateQueries(['service-now-incidents', user?.localAccountId]);
		},
	});
};

export const useUploadAttachmentsServiceNowIncidents = () => {
	const user = useCurrentUser();
	const client = useFramework().modules.serviceDiscovery.createClient('service-now');

	return useMutation<UploadStatus, FormattedError, { incidentId: string; files: File[] }>({
		mutationKey: ['upload-service-now-incidents-files'],
		mutationFn: async (data) => uploadAttachments(await client, data.files, data.incidentId, user?.localAccountId),
	});
};
