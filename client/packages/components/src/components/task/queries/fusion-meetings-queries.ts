import { IHttpClient } from '@equinor/fusion-framework-module-http';

export async function getMyMeetingsActions(client: IHttpClient, signal?: AbortSignal): Promise<any[]> {
	const response = await client.fetch('/persons/me/actions', { signal });

	return await response.json();
}

export async function getMyActionsMeetings(client: IHttpClient, signal?: AbortSignal): Promise<any[]> {
	const response = await client.fetch('/persons/me/actions/meetings', { signal });

	return await response.json();
}
