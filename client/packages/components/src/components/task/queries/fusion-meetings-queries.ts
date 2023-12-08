/* eslint-disable @typescript-eslint/no-explicit-any */
import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { Task } from '../types/task';

import { verifyDate } from '../utils/time';

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

export async function getMyReviewActions(client: IHttpClient, signal?: AbortSignal): Promise<Task[]> {
	const response = await client.fetch('/persons/me/actions', { signal });
	const tasks: any[] = await response.json();

	return tasks.map((task) => ({
		id: task.id,
		title: task.title,
		source: 'Review',
		description: stripHtml(task.description),
		href: `${location.origin}/apps/review/`,
		dueDate: verifyDate(task.dueDateUtc),
		state: task.isActive ? 'Active' : task.isCompleted ? 'Completed' : task.isDeleted ? 'Deleted' : 'Unknown',
		isExternal: false,
	}));
}
