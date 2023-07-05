import { useFramework } from '@equinor/fusion-framework-react';
import { useQuery } from 'react-query';
import { getFusionTasks, getPimsTasks, getProCoSysAssignments } from './assignment-queries';

export function useAssignment() {
	const fusionAssignments = useAssignmentQuery();
	const procosysTasks = useProCoSysTaskQuery();
	const pimsTask = usePimsTaskQuery();

	return [...(fusionAssignments.data || []), ...(procosysTasks.data || []), ...(pimsTask.data || [])];
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
