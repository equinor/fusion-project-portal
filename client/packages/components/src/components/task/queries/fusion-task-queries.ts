import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { FusionTask } from '../types/fusion-task';
import { PimsTask } from '../types/pims-task';
import { ProcosysTasks } from '../types/procosys-task';

export async function getFusionTasks(client: IHttpClient, signal?: AbortSignal): Promise<FusionTask[]> {
	const response = await client.fetch('/persons/me/tasks', { signal });
	return await response.json();
}

export async function getPimsTasks(client: IHttpClient, signal?: AbortSignal): Promise<PimsTask[]> {
	const response = await client.fetch('/persons/me/tasks/pims', { signal });
	return await response.json();
}

export async function getProCoSysAssignments(client: IHttpClient, signal?: AbortSignal): Promise<ProcosysTasks[]> {
	const response = await client.fetch('/persons/me/tasks/procosys', { signal });

	return await response.json();
}
