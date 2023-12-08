import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { PimsTask } from '../types/pims-task';

export async function getPimsTasks(client: IHttpClient, signal?: AbortSignal): Promise<PimsTask[]> {
	const response = await client.fetch('/persons/me/tasks/pims', { signal });
	return await response.json();
}
