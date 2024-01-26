import { useUser } from '@portal/core';

import { Card, Typography } from '@equinor/eds-core-react';
import { useRelationsByType } from '@equinor/portal-core';
import { useFramework } from '@equinor/fusion-framework-react';
import { useQuery } from 'react-query';

import { FusionError, OrgProject } from '@portal/types';
import { useEffect, useMemo } from 'react';
import { ProfileCardHeader } from '../my-account/components/ProfileCardHeader';

export const useProjectDetails = (projectId?: string) => {
	const client = useFramework().modules.serviceDiscovery.createClient('org');

	return useQuery<OrgProject, FusionError>({
		queryKey: ['project ', projectId],
		queryFn: async () => {
			const response = (await client).fetch(`projects/${projectId}`);
			return (await response).json();
		},
		enabled: Boolean(projectId),
		_defaulted: undefined,
	});
};

export const useCurrentDirector = () => {
	const equinorTask = useRelationsByType('OrgChart');
	const { data, isLoading } = useProjectDetails(equinorTask[0]?.externalId);

	const director = useMemo(() => {
		const currentDate = new Date();
		return data?.director.instances.find((instance: any) => {
			const startDate = new Date(instance.appliesFrom);
			const endDate = new Date(instance.appliesTo);

			return currentDate >= startDate && currentDate <= endDate;
		});
	}, [data]);

	return { director, isLoading };
};

export const ProjectDirector = () => {
	const { director } = useCurrentDirector();

	const { data } = useUser(director?.assignedPerson?.azureUniqueId);
	return (
		<Card>
			<Card.Header>
				<Typography variant="h6">Project Director</Typography>
			</Card.Header>
			<ProfileCardHeader user={data} trigger="click" />
		</Card>
	);
};
