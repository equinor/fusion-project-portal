import { useUser } from '@portal/core';

import { Card, Typography } from '@equinor/eds-core-react';
import { useFrameworkCurrentContext, useRelationsByType } from '@equinor/portal-core';
import { useFramework } from '@equinor/fusion-framework-react';
import { useQuery } from 'react-query';

import { FusionError, OrgProject } from '@portal/types';
import { useMemo } from 'react';
import { ProfileCardHeader } from '@portal/components';

import { KpiCardItem } from './KpiItem';
import styled from 'styled-components';

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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return data?.director?.instances.find((instance: any) => {
			const startDate = new Date(instance.appliesFrom);
			const endDate = new Date(instance.appliesTo);

			return currentDate >= startDate && currentDate <= endDate;
		});
	}, [data]);

	return { director, isLoading, error };
};

const Styles = {
	Content: styled(Card.Content).withConfig({ displayName: 'phase' })`
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	`,
};

import { DateTime } from 'luxon';
import { tokens } from '@equinor/eds-tokens';
import { NoProjectInfoAccessMessage } from './NoProjectInfoAccessMessage';

export const verifyDate = (date?: string | null | Date): string | undefined => {
	return date
		? new Date(date).toString() !== 'Invalid Date'
			? DateTime.fromJSDate(new Date(date)).toFormat('dd/MM/yyyy')
			: '-'
		: undefined;
};

interface DateObject {
	dG1: Date;
	dG2: Date;
	dG3: Date;
	dG4: Date;
}

function findActiveDate(dateObject?: DateObject): Date | undefined {
	if (!dateObject) return;

	const dG1 = new Date(dateObject.dG1);
	const dG2 = new Date(dateObject.dG2);
	const dG3 = new Date(dateObject.dG3);
	const dG4 = new Date(dateObject.dG4);

	if (isCurrentDateBetween(dG1, dG2)) {
		return dG1;
	} else if (isCurrentDateBetween(dG2, dG3)) {
		return dG2;
	} else if (isCurrentDateBetween(dG3, dG4)) {
		return dG3;
	} else {
		return dG4;
	}
}

function isCurrentDateBetween(start: Date, end: Date): boolean {
	const currentDate = new Date();
	return currentDate >= start && currentDate <= end;
}
function isGetActiveDateColor(currentDate?: Date | null, dGDate?: Date | null) {
	if (!currentDate || !dGDate) return;
	return verifyDate(currentDate) === verifyDate(dGDate) ? tokens.colors.interactive.success__resting.hex : undefined;
}

export const Phases = () => {
	const context = useFrameworkCurrentContext();
	const equinorTask = useRelationsByType('OrgChart', context?.id);
	const { data, isLoading, error } = useProjectDetails(equinorTask[0]?.externalId);

	const current = useMemo(() => findActiveDate(data?.dates.gates as DateObject), [data]);

	return (
		<Card elevation="raised">
			<Card.Header>
				<Typography variant="h5">Phases</Typography>
				<Typography variant="meta">
					{verifyDate(data?.dates.startDate)} - {verifyDate(data?.dates.endDate)}
				</Typography>
			</Card.Header>

			{error ? (
				<NoProjectInfoAccessMessage />
			) : (
				<Styles.Content>
					<KpiCardItem
						{...{
							title: 'DG1',
							value: verifyDate(data?.dates.gates.dG1),
							color: isGetActiveDateColor(current, data?.dates.gates.dG1),
							subTitle: 'Concept planning',
							isLoading: isLoading,
						}}
					/>
					<KpiCardItem
						{...{
							title: 'DG2',
							value: verifyDate(data?.dates.gates.dG2),
							color: isGetActiveDateColor(current, data?.dates.gates.dG2),
							subTitle: 'Definition',
							isLoading: isLoading,
						}}
					/>
					<KpiCardItem
						{...{
							title: 'DG3',
							value: verifyDate(data?.dates.gates.dG3),
							color: isGetActiveDateColor(current, data?.dates.gates.dG3),
							subTitle: 'Execution',
							isLoading: isLoading,
						}}
					/>
					<KpiCardItem
						{...{
							title: 'DG4',
							value: verifyDate(data?.dates.gates.dG4),
							color: isGetActiveDateColor(current, data?.dates.gates.dG4),
							subTitle: 'Operation',
							isLoading: isLoading,
						}}
					/>
				</Styles.Content>
			)}
		</Card>
	);
};

export const ProjectDirector = () => {
	const context = useFrameworkCurrentContext();
	const { director, error } = useCurrentDirector(context?.id);

	const { data } = useUser(director?.assignedPerson?.azureUniqueId);

	return (
		<Card elevation="raised">
			<Card.Header>
				<Typography variant="h6">Project Director</Typography>
			</Card.Header>
			{error ? <NoProjectInfoAccessMessage /> : <ProfileCardHeader user={data} trigger="click" />}
		</Card>
	);
};
