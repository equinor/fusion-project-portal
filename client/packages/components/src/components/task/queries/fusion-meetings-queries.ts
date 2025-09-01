import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { Task } from '../types/task';

import { verifyDate } from '../utils/time';
import { ActionState, MeetingAction, MeetingType } from '../types/meetings-task';
import { isTaskOverdue } from './query-ncr-request-queries';

function stripHtml(html?: string) {
	const tmp = document.createElement('DIV');
	tmp.innerHTML = html || '';
	return tmp.textContent || tmp.innerText || '';
}

export async function getMyMeetingsActions(client: IHttpClient, signal?: AbortSignal): Promise<MeetingAction[]> {
	const response = await client.fetch('/persons/me/actions?api-version=4.0', { signal });

	const tasks: MeetingAction[] = await response.json();
	return tasks;
}

export function myMeetingsActionSelector(tasks: MeetingAction[]): Task[] {
	return tasks
		.filter((a) => a.state !== ActionState.Completed && a.state !== ActionState.NotCompleted)
		.map((task) => ({
			id: task.id,
			title: task.title,
			source: 'Meetings',
			description: stripHtml(task.description),
			href: `${location.origin}/apps/meetings/meeting/${task.meeting?.id}/actions/${task.id}`,
			dueDate: verifyDate(task.dueDateUtc),
			isOverdue: isTaskOverdue(task.dueDateUtc),
			state: task.isArchived
				? 'Archived'
				: task.isCompleted
				? 'Completed'
				: task.isDeleted
				? 'Deleted'
				: 'Unknown',
			isExternal: false,
			project: task.meeting?.project?.name,
			priority: task.priority,
		}));
}

export async function getMyReviewActions(
	client: IHttpClient,
	signal?: AbortSignal
): Promise<Task[]> {
	  const response = await client.fetch('/persons/me/actions?api-version=4.0', { signal });

  if (!response.ok) {
    throw new Error(`Failed to fetch Review actions: ${response.statusText}`);
  }

  const tasks: MeetingAction[] = await response.json();



  return tasks
    .filter(
      (task) => task.state !== ActionState.Completed && task.state !== ActionState.NotCompleted,
    )
    .map((task) => ({
      id: task.id,
      title: task.title,
      source: 'Review',
      description: stripHtml(task.description),
      href: `${location.origin}/apps/reviews/${task.project?.id}/landingpage/actions/${task.id}`,
      dueDate: task.dueDateUtc,
      isOverdue: isTaskOverdue(task.dueDateUtc),
      createdDate: task.createdUtc,
      state: task.state,
      project: task.review?.project?.name,
      priority: task.priority,
    }));
}
