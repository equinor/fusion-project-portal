/* eslint-disable @typescript-eslint/no-explicit-any */
import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { Task } from '../types/task';

import { verifyDate } from '../utils/time';
import { getFusionOrigin } from '@portal/core';

function stripHtml(html?: string) {
	const tmp = document.createElement('DIV');
	tmp.innerHTML = html || '';
	return tmp.textContent || tmp.innerText || '';
}

export async function getMyMeetingsActions(client: IHttpClient, signal?: AbortSignal): Promise<Task[]> {
	const response = await client.fetch('/persons/me/actions', { signal });

	const tasks: any[] = await response.json();

	return tasks.map((task) => ({
		id: task.id,
		title: task.title,
		source: 'Meetings',
		description: stripHtml(task.description),
		href: `${location.origin}/apps/meetings/meeting/${task.meeting.id}/actions/${task.id}`,
		dueDate: verifyDate(task.dueDateUtc),
		state: task.isActive ? 'Active' : task.isCompleted ? 'Completed' : task.isDeleted ? 'Deleted' : 'Unknown',
		isExternal: false,
	}));
}

export async function getMyReviewActions(
	client: IHttpClient,
	contextClient: IHttpClient,
	signal?: AbortSignal
): Promise<Task[]> {
	const response = await client.fetch('/persons/me/actions', { signal });

	const tasks: any[] = await response.json();

	// Get all unique OrgChart context Ids
	const context = tasks.reduce((acc, task) => {
		if (!acc.includes(task.contextId)) {
			acc.push(task.contextId);
		}
		return acc;
	}, [] as string[]) as string[];

	// Resolve project master ids by OrgChart context Ids
	const contextResponse = (
		await Promise.all(
			context.map(
				async (contextId) =>
					await contextClient.json(`/contexts/${contextId}/relations?$filter=type eq ProjectMaster`, {
						signal,
					})
			)
		)
	).flat() as { id: string }[];

	//create context map OrgChart:ProjectMaster
	const map = context.reduce((acc, c, i) => {
		acc[c] = contextResponse[i].id;
		return acc;
	}, {} as Record<string, string>);

	return tasks.map((task) => ({
		id: task.id,
		title: task.title,
		source: 'Review',
		description: stripHtml(task.description),
		href: `${getFusionOrigin()}apps/reviews/${map[task.contextId]}/landingpage/actions/${task.id}`,
		dueDate: verifyDate(task.dueDateUtc),
		state: task.isActive ? 'Active' : task.isCompleted ? 'Completed' : task.isDeleted ? 'Deleted' : 'Unknown',
		isExternal: true,
	}));
}
