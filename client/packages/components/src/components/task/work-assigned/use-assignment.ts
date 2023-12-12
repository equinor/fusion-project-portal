import { useFramework } from '@equinor/fusion-framework-react';
import { useQuery } from 'react-query';
import { getPimsTasks } from './assignment-queries';
import { getMyMeetingsActions, getMyReviewActions } from '../queries/fusion-meetings-queries';
import { getQueryAndNCRequest } from '../queries/query-ncr-request-queries';
import { Task } from '../types/task';
import { getFusionTasks, getProCoSysAssignments } from '../queries/fusion-task-queries';

export function useAssignment() {
	// const { data: fusionAssignments } = useAssignmentQuery();
	const { data: procosysTasks } = useProCoSysTaskQuery();
	// const { data: pimsTask } = usePimsTaskQuery();

	const { data: meetingsActions } = useMeetingsActionsQuery();
	const { data: reviewActions } = useReviewActionsQuery();

	const { data: queryAndNCRRequests } = useQueryAndNCRRequestQuery();

	return [
		...(procosysTasks || []),
		...(reviewActions || []),
		...(meetingsActions || []),
		...(queryAndNCRRequests || []),
	] as Task[];
}

export function useAssignmentQuery() {
	const client = useFramework().modules.serviceDiscovery.createClient('fusion-tasks');
	return useQuery({
		queryKey: ['Assignment', 'Fusion'],
		queryFn: async ({ signal }) => getFusionTasks(await client, signal),
		cacheTime: 5000 * 60,
		refetchInterval: 5000 * 60,
		staleTime: 2000 * 60,
	});
}

export function useProCoSysTaskQuery() {
	const client = useFramework().modules.serviceDiscovery.createClient('fusion-tasks');
	return useQuery({
		queryKey: ['Assignment', 'ProCoSys'],
		queryFn: async ({ signal }) => getProCoSysAssignments(await client, signal),
		cacheTime: 5000 * 60,
		refetchInterval: 5000 * 60,
		staleTime: 2000 * 60,
	});
}

export function usePimsTaskQuery() {
	const client = useFramework().modules.serviceDiscovery.createClient('fusion-tasks');
	return useQuery({
		queryKey: ['Assignment', 'Pims'],
		queryFn: async ({ signal }) => getPimsTasks(await client, signal),
		cacheTime: 5000 * 60,
		refetchInterval: 5000 * 60,
		staleTime: 2000 * 60,
	});
}

export function useMeetingsActionsQuery() {
	const client = useFramework().modules.serviceDiscovery.createClient('meeting');
	return useQuery({
		queryKey: ['Assignment', 'Meetings', 'Meetings-Actions'],
		queryFn: async ({ signal }) => getMyMeetingsActions(await client, signal),
		cacheTime: 5000 * 60,
		refetchInterval: 5000 * 60,
		staleTime: 2000 * 60,
	});
}
export function useReviewActionsQuery() {
	const client = useFramework().modules.http.createClient('review');
	const contextClient = useFramework().modules.serviceDiscovery.createClient('context');
	return useQuery({
		queryKey: ['Assignment', 'Review', 'Review-Actions'],
		queryFn: async ({ signal }) => getMyReviewActions(await client, await contextClient, signal),
		cacheTime: 5000 * 60,
		refetchInterval: 5000 * 60,
		staleTime: 2000 * 60,
	});
}
export function useQueryAndNCRRequestQuery() {
	const client = useFramework().modules.http.createClient('query_api');
	return useQuery({
		queryKey: ['Assignment', 'Query', 'Query-Actions'],
		queryFn: async ({ signal }) => getQueryAndNCRequest(await client, signal),
		cacheTime: 5000 * 60,
		refetchInterval: 5000 * 60,
		staleTime: 2000 * 60,
	});
}
