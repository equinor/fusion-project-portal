import { Button, Card, Typography } from '@equinor/eds-core-react';
import { useFrameworkCurrentContext, useRelationsByType } from '@equinor/portal-core';
import { useMemo } from 'react';
import { KpiCardItem } from './KpiItem';
import styled from 'styled-components';

const Styles = {
	Content: styled(Card.Content).withConfig({ displayName: 'phase' })`
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	`,
};

import { DateObject, findActiveDate, isGetActiveDateColor, verifyDate } from './utils/date';

import { NoProjectInfoAccessMessage } from '../messages/NoProjectInfoAccessMessage';
import { useProjectDetails } from '../../../project-page/components/project-director/hooks/use-current-director';
import { useFramework } from '@equinor/fusion-framework-react';

export const FacilityProjectPhases = () => {
	const context = useFrameworkCurrentContext();
	const projectMasters = useRelationsByType('ProjectMaster', context?.id);

	return (
		<>
			{projectMasters.map((context) => (
				<Phases key={context.id} projectMasterId={context.id} title={context.title} />
			))}
		</>
	);
};

const Phases = (props: { projectMasterId: string; title: string }) => {
	const equinorTask = useRelationsByType('OrgChart', props.projectMasterId);
	const { data, isLoading, error } = useProjectDetails(equinorTask[0]?.externalId);

	const current = useMemo(() => findActiveDate(data?.dates.gates as DateObject), [data]);

	const { context } = useFramework().modules;

	return (
		<Card elevation="raised">
			<Card.Header>
				<Typography variant="h6">{props.title}</Typography>
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
			<Card.Actions alignRight={true}>
				<Button variant="ghost" onClick={() => context.setCurrentContextByIdAsync(props.projectMasterId)}>
					{props.title}
				</Button>
			</Card.Actions>
		</Card>
	);
};
