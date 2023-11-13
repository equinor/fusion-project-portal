import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { AttachmentResponse, Incident } from '../types/types';
import { formatError } from '../utils/error-utils';
import { handleAttachmentsResponse } from '../utils/handle-attachments-response';

export const getIncidentsQuery = async (client: IHttpClient, azureUniqueId?: string, signal?: AbortSignal) => {
	const response = await client.fetch(`persons/${azureUniqueId}/incidents`, {
		method: 'GET',
		signal,
	});

	if (!response.ok) {
		throw formatError(await response.json(), response.status);
	}

	const data = await response.json();
	return data as Incident[];
};

export const createIncidentsQuery = async (
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

	if (!response.ok) {
		throw formatError(await response.json(), response.status);
	}

	const data = await response.json();
	return data as Incident;
};

export const uploadAttachments = async (
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

	if (response.status === 401) {
		const error = {
			type: 'Error',
			status: 401,
			title: 'Attachments failed to upload',
			messages: ['Status 401', 'Invalid token'],
		};
		throw error;
	}

	if (!response.ok) {
		throw formatError(await response.json(), response.status);
	}

	return handleAttachmentsResponse((await response.json()) as AttachmentResponse[], attachments.length);
};
