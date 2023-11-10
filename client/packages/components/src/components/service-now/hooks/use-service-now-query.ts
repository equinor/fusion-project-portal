import { useFramework } from '@equinor/fusion-framework-react';
import { useCurrentUser } from '@equinor/fusion-framework-react/hooks';

import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Incident } from '../types/types';
import { FusionError } from '@portal/types';
import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { useIncidentMeta } from './use-insident-meta';

export const useGetServiceNowIncidents = () => {
	const user = useCurrentUser();
	const client = useFramework().modules.serviceDiscovery.createClient('service-now');

	// const queryClient = useQueryClient();

	return useQuery<Incident[], FusionError>({
		queryKey: ['service-now-incidents', user?.localAccountId],
		queryFn: async ({ signal }) => getIncidentsQuery(await client, user?.localAccountId, signal),
		enabled: Boolean(user?.localAccountId),
	});
};
export const useCreateServiceNowIncidents = () => {
	const user = useCurrentUser();
	const client = useFramework().modules.serviceDiscovery.createClient('service-now');

	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ['new-service-now-incidents', user?.localAccountId],
		mutationFn: async (body: { description: string; shortDescription: string; metadata: Record<string, string> }) =>
			createIncidentsQuery(await client, body, user?.localAccountId),
		onSuccess() {
			queryClient.invalidateQueries(['service-now-incidents', user?.localAccountId]);
		},
	});
};

export const useUploadAttachmentsServiceNowIncidents = () => {
	const user = useCurrentUser();
	const client = useFramework().modules.serviceDiscovery.createClient('service-now');

	return useMutation({
		mutationKey: ['upload-service-now-incidents-files'],
		mutationFn: async (data: { incidentId: string; files: File[] }) =>
			uploadAttachments(await client, data.files, data.incidentId, user?.localAccountId),
	});
};

const getIncidentsQuery = async (client: IHttpClient, azureUniqueId?: string, signal?: AbortSignal) => {
	const response = await client.fetch(`persons/${azureUniqueId}/incidents`, {
		method: 'GET',
		signal,
	});

	const data = await response.json();
	if (!response.ok) {
		throw data;
	}

	return data;
};

const createIncidentsQuery = async (
	client: IHttpClient,
	body: { shortDescription: string; description: string; metadata: Record<string, string> },
	azureUniqueId?: string
) => {
	const response = await client.fetch<Response>(`persons/${azureUniqueId}/incidents`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

	const data = await response.json();
	if (!response.ok) {
		throw data;
	}

	return data as Incident | undefined;
};

const uploadAttachments = async (
	client: IHttpClient,
	attachments: File[],
	incidentId: string,
	azureUniqueId?: string
) => {
	const formData = new FormData();
	attachments.forEach((a) => {
		formData.append('attachments', a);
	});
	const response = await client.fetch(`persons/${azureUniqueId}/incidents/${incidentId}/attachments/$batch`, {
		method: 'POST',
		body: formData,
	});

	const data = await response.json();
	if (!response.ok) {
		throw data;
	}

	return data;
};
