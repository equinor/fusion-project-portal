import { Accordion, Autocomplete, Icon, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { GroupAssignments } from './GroupAssignments';
import { FusionTask } from './types/fusion-task';
import { useAssignment } from './use-assignment';

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
	height: auto;
`;

const StyledAssignmentsListWrapper = styled.div`
	flex: 2;
	overflow: auto;
	padding-bottom: 1rem;
	margin-top: 1rem;
	margin-bottom: 1rem;
`;

const StyledAccordianItem = styled(Accordion.Item)`
	border: none;
`;

const StyledAccordianHeader = styled(Accordion.Header)`
	border: none;
`;

const StyledAccordianPanel = styled(Accordion.Panel)`
	border: none;
`;
const StyledAccordian = styled(Accordion)`
	height: 100%;
`;

const groupOption = {
	Category: (task: FusionTask) => task.category,
	'Owner Application': (task: FusionTask) => task.ownerApplication?.title || 'Unknown',
	Priority: (task: FusionTask) => task.priority,
	'Source System': (task: FusionTask) => task.sourceSystem?.subSystem || 'Unknown',
	State: (task: FusionTask) => task.state,
	TaskMode: (task: FusionTask) => task.taskMode,
	Type: (task: FusionTask) => task.type || 'Unknown',
};

const groupBy = (arr: FusionTask[], getKey: (task: FusionTask) => string) =>
	arr.reduce((groups, item) => {
		const key = getKey(item);
		(groups[key] ||= []).push(item);
		return groups;
	}, {} as Record<PropertyKey, FusionTask[]>);
interface TasksProps {
	maxDisplay?: number;
	height?: number;
}

const Style = {
	Wrapper: styled.div`
		height: 100%;
		overflow: hidden;
		position: relative;
		display: flex;
		flex-direction: column;
	`,
};

export const Tasks: FC<TasksProps> = ({ maxDisplay, height }) => {
	const [groupedBy, setGroupedBy] = useState<keyof typeof groupOption>('Category');
	const assignments = useAssignment().slice(0, maxDisplay ? maxDisplay : -1);

	const groupedAssignments = groupBy(assignments, groupOption[groupedBy]);

	return (
		<Style.Wrapper>
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
						options={Object.keys(groupOption)}
						autoWidth={true}
						hideClearButton={true}
						label={'Group by'}
						selectedOptions={[groupedBy]}
						onOptionsChange={(changes) =>
							setGroupedBy(changes.selectedItems[0] as keyof typeof groupOption)
						}
					/>
				</StyledKpiItem>
			</StyledKpiWrapper>
			<StyledAssignmentsListWrapper>
				<StyledAssignmentsList>
					<StyledAccordian>
						{Object.entries(groupedAssignments).map(([groupName, tasks]) => (
							<StyledAccordianItem isExpanded key={groupName}>
								<StyledAccordianHeader>{groupName}</StyledAccordianHeader>
								<StyledAccordianPanel>
									<GroupAssignments assignments={tasks} />
								</StyledAccordianPanel>
							</StyledAccordianItem>
						))}
					</StyledAccordian>
				</StyledAssignmentsList>
			</StyledAssignmentsListWrapper>
		</Style.Wrapper>
	);
};
