import { Autocomplete, Icon, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { GroupAssignments } from './GroupAssignments';
import { testTasks } from './mockTasks';
import { FusionTask } from './types/fusion-task';

const StyledKpiWrapper = styled.div`
	display: flex;
`;

const StyledKpiItem = styled.div`
	flex: 1;
	width: 50px;
`;

const StyledKpi = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
`;

const StyledTitle = styled(Typography)`
	color: ${tokens.colors.text.static_icons__tertiary.hex};
	font-size: 12px;
	line-height: 16px;
`;

const StyledAssignmentsList = styled.div`
	margin-top: 1rem;
	overflow: auto;
	height: 100%;
`;

const StyledAssignmentsListWrapper = styled.div`
	overflow: hidden;
	height: 600px;
`;

const groupByOptions = [
	'Category',
	'CreatedBy',
	'OwnerApplication',
	'Priority',
	'SourceSystem',
	'State',
	'TaskMode',
	'Type',
] as const;

const getKey = (option: (typeof groupByOptions)[number]): ((task: FusionTask) => string) => {
	switch (option) {
		case 'Category':
			return (task) => task.category;
		case 'CreatedBy':
			return (task) => task.createdBy;
		case 'OwnerApplication':
			return (task) => task.ownerApplication.title;
		case 'Priority':
			return (task) => task.priority;
		case 'SourceSystem':
			return (task) => task.sourceSystem.subSystem;
		case 'State':
			return (task) => task.state;
		case 'TaskMode':
			return (task) => task.taskMode;
		case 'Type':
			return (task) => task.state;

		default:
			throw new Error();
	}
};

interface TasksProps {
	maxDisplay?: number;
}

export const Tasks: FC<TasksProps> = ({ maxDisplay }) => {
	const [groupedBy, setGroupedBy] = useState<(typeof groupByOptions)[number]>('Category');
	// const assignments = useAssignment().slice(0, maxDisplay ? maxDisplay : -1);
	const assignments = testTasks;

	const groupBy = (arr: FusionTask[]) =>
		arr.reduce((groups, item) => {
			const key = getKey(groupedBy);
			(groups[key(item)] ||= []).push(item);
			return groups;
		}, {} as Record<PropertyKey, FusionTask[]>);

	const results = groupBy(assignments);
	console.log(results);

	return (
		<>
			<StyledKpiWrapper>
				<StyledKpiItem>
					<StyledKpi>
						<Typography variant="h5">{assignments.length}</Typography>
						<Icon name="time" />
					</StyledKpi>
					<StyledTitle>Pending requests</StyledTitle>
				</StyledKpiItem>
				<StyledKpiItem>
					<Autocomplete
						options={groupByOptions as unknown as string[]}
						autoWidth={true}
						hideClearButton={true}
						label={'Group by'}
						selectedOptions={[groupedBy]}
						onOptionsChange={(changes) => setGroupedBy(changes.selectedItems[0] as any)}
					/>
				</StyledKpiItem>
			</StyledKpiWrapper>
			<StyledAssignmentsListWrapper>
				<StyledAssignmentsList>
					{Object.entries(results).map(([groupName, tasks]) => (
						<GroupAssignments key={groupName} assignments={tasks} groupTitle={groupName} />
					))}
				</StyledAssignmentsList>
			</StyledAssignmentsListWrapper>
		</>
	);
};
