import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { OnboardedContext } from '../../types/onboarded-contexts';

/** Get views from portal api */
export async function getAvailableContext(client: IHttpClient): Promise<OnboardedContext[]> {
	const res = await client.fetch(`/api/onboarded-contexts`);
	if (!res.ok) throw res;
	return (await res.json()) as OnboardedContext[];
}
