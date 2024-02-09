import { useRelationsByType } from '@equinor/portal-core';
import { useFramework } from '@equinor/fusion-framework-react';
import { useQuery } from 'react-query';

import { FusionError, OrgProject } from '@portal/types';
import { useMemo } from 'react';

export const useProjectDetails = (projectId?: string) => {
	const client = useFramework().modules.serviceDiscovery.createClient('org');

	return useQuery<OrgProject, FusionError>({
		queryKey: ['project ', projectId],
		queryFn: async () => {
			const response = await (await client).fetch(`projects/${projectId}`);

			if (response.status === 403) {
				throw await response.json();
			}
			if (!response.ok) {
				throw Error('Error');
			}

			return await response.json();
		},
		enabled: Boolean(projectId),
		_defaulted: undefined,
	});
};

export const useCurrentDirector = (contextId?: string) => {
	const equinorTask = useRelationsByType('OrgChart', contextId);
	const { data, isLoading, error } = useProjectDetails(equinorTask[0]?.externalId);

	const director = useMemo(() => {
		const currentDate = new Date();
		return data?.director?.instances.find((instance) => {
			const startDate = new Date(instance.appliesFrom);
			const endDate = new Date(instance.appliesTo);

			return currentDate >= startDate && currentDate <= endDate;
		});
	}, [data]);

	return { director, isLoading, error };
};
