import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { PortalApp, PortalAppMutation } from '../types';
import { Result } from './apps-queries';

export const editOnboardedApp = async (client: IHttpClient, app: PortalAppMutation) => {
	const response = await client.fetch<Response>(`api/onboarded-apps/${app.appKey}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			contextTypes: app.contextTypes,
		}),
	});

	if (!response.ok) {
		return { appKey: app.appKey, status: 'failed' } as Result;
	}

	return { appKey: app.appKey, status: 'success' } as Result;
};

export const editOnboardedApps = async (client: IHttpClient, onboardedApps: PortalAppMutation[]) => {
	const results: Result[] = [];
	console.log(onboardedApps);
	for (const app of onboardedApps) {
		const result = await editOnboardedApp(client, app);
		results.push(result);
	}

	return results as Result[];
};
