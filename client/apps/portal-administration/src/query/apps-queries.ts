import { IHttpClient } from '@equinor/fusion-framework-react-app/http';
import { formatError } from '../utils/error-utils';
import { AppManifestResponse, PortalApplication } from '../types';

export type Result = {
	appKey: string;
	status: 'failed' | 'success';
};

/**
 * Retrieves the portal apps by portal ID.
 *
 * @param client - The HTTP client used to make the request.
 * @param portalId - The ID of the portal.
 * @param signal - An optional AbortSignal to abort the request.
 * @returns A promise that resolves to an array of AppManifestResponse objects.
 * @throws If the response is not successful, an error is thrown with the formatted error message and status code.
 */
export const getPortalAppsByPortalId = async (client: IHttpClient, portalId?: string, signal?: AbortSignal) => {
	const response = await client.fetch<Response>(`api/portals/${portalId}/apps`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		signal,
	});

	if (!response.ok) {
		throw formatError(await response.json(), response.status);
	}

	const data = await response.json();
	return data as AppManifestResponse[];
};

/**
 * Retrieves the list of onboarded portal apps for a specific portal.
 *
 * @param client - The HTTP client used to make the API request.
 * @param portalId - The ID of the portal. If not provided, all onboarded apps for all portals will be retrieved.
 * @param signal - An optional AbortSignal to abort the request.
 * @returns A Promise that resolves to an array of PortalApplication objects representing the onboarded portal apps.
 * @throws If the API request fails or returns an error, an error will be thrown.
 */
export const getOnboardedPortalApps = async (client: IHttpClient, portalId?: string, signal?: AbortSignal) => {
	const response = await client.fetch(`api/portals/${portalId}/onboarded-apps`, {
		method: 'GET',
		signal,
	});

	if (!response.ok) {
		throw formatError(await response.json(), response.status);
	}

	const data = (await response.json()) as PortalApplication[];
	return data as PortalApplication[];
};

/**
 * Retrieves an onboarded portal app by its app key.
 *
 * @param client - The HTTP client used to make the request.
 * @param portalId - The ID of the portal.
 * @param appKey - The app key of the onboarded app.
 * @param signal - An optional AbortSignal to abort the request.
 * @returns A Promise that resolves to the retrieved PortalApplication.
 * @throws If the request fails or returns an error response.
 */
export const getOnboardedPortalAppByAppKey = async (
	client: IHttpClient,
	portalId?: string,
	appKey?: string,
	signal?: AbortSignal
) => {
	const response = await client.fetch(`api/portals/${portalId}/onboarded-apps/${appKey}`, {
		method: 'GET',
		signal,
	});

	if (!response.ok) {
		throw formatError(await response.json(), response.status);
	}

	const data = await response.json();
	return data as PortalApplication;
};

/**
 * Adds a portal app to a specific portal.
 *
 * @param client - The HTTP client used to make the API request.
 * @param appKey - The key of the app to be added.
 * @param portalId - The ID of the portal to which the app will be added.
 * @returns A promise that resolves to a Result object indicating the status of the operation.
 */
export const addPortalApp = async (client: IHttpClient, appKey: string, portalId: string) => {
	const response = await client.fetch<Response>(`api/portals/${portalId}/apps`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			appKey,
			removeAppForContexts: true,
		}),
	});

	if (!response.ok) {
		return { appKey, status: 'failed' } as Result;
	}

	return { appKey, status: 'success' } as Result;
};

/**
 * Adds portal applications to the specified portal.
 *
 * @param client - The HTTP client used to make the API request.
 * @param portalApps - An array of portal applications to be added.
 * @param portalId - The ID of the portal to which the applications will be added.
 * @returns An array of results indicating the success or failure of each application addition.
 */
export const addPortalApps = async (client: IHttpClient, portalApps: PortalApplication[], portalId?: string) => {
	if (!portalId) return [] as Result[];
	const results: Result[] = [];

	for (const app of portalApps) {
		const result = await addPortalApp(client, app.appManifest.appKey, portalId);
		results.push(result);
	}

	return results as Result[];
};

/**
 * Removes a portal app.
 *
 * @param client - The HTTP client.
 * @param appKey - The key of the app to be removed.
 * @param portalId - The ID of the portal.
 * @returns A promise that resolves to a Result object indicating the status of the removal operation.
 */
export const removePortalApp = async (client: IHttpClient, appKey: string, portalId: string) => {
	const response = await client.fetch<Response>(`api/portals/${portalId}/apps/${appKey}`, {
		method: 'DELETE',
	});

	if (!response.ok) {
		return { appKey, status: 'failed' } as Result;
	}

	return { appKey, status: 'success' } as Result;
};

/**
 * Removes portal applications from the specified portal.
 *
 * @param client - The HTTP client used to make the API request.
 * @param portalApps - An array of portal applications to be removed.
 * @param portalId - The ID of the portal from which the applications will be removed.
 * @returns An array of results indicating the success or failure of each removal operation.
 */
export const removePortalApps = async (client: IHttpClient, portalApps: PortalApplication[], portalId?: string) => {
	if (!portalId) return [] as Result[];
	const results: Result[] = [];

	for (const app of portalApps) {
		const result = await removePortalApp(client, app.appManifest.appKey, portalId);
		results.push(result);
	}

	return results as Result[];
};
