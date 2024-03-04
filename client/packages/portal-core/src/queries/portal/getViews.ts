import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { Portal } from '@portal/core';

/** Get views from portal api */
export async function getViews(client: IHttpClient): Promise<Portal[]> {
	const res = await client.fetch(`/api/work-surfaces`);
	if (!res.ok) throw res;
	return (await res.json()) as Portal[];
}
