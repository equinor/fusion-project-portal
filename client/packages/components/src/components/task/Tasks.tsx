import { Autocomplete, Icon, Tabs, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { FC, useMemo, useState } from 'react';
import styled from 'styled-components';

import { FusionTask } from './types/fusion-task';
import { useAssignment } from './work-assigned/use-assignment';
import { TaskItem } from './components/TaskItem';
import { time, warning_outlined } from '@equinor/eds-icons';
import { Task, TaskSource } from './types/task';
import { PortalMessage } from '@portal/ui';

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
	height: 100%;
	overflow: auto;
`;

const StyledAssignmentsListWrapper = styled.div`
	flex: 2;
	overflow: hidden;
	padding-bottom: 1rem;
`;

// const StyledAccordianItem = styled(Accordion.Item)`
// 	border: none;
// `;

// const StyledAccordianHeader = styled(Accordion.Header)`
// 	border: none;
// `;

// const StyledAccordianPanel = styled(Accordion.Panel)`
// 	border: none;
// `;
// const StyledAccordian = styled(Accordion)`
// 	height: 100%;
// `;

const groupOption = {
	Category: (task: FusionTask) => task.category,
	'Owner Application': (task: FusionTask) => task.ownerApplication?.title || 'Unknown',
	Priority: (task: FusionTask) => task.priority,
	'Source System': (task: FusionTask) => task.sourceSystem?.subSystem || 'Unknown',
	State: (task: FusionTask) => task.state,
	TaskMode: (task: FusionTask) => task.taskMode,
	Type: (task: FusionTask) => task.type || 'Unknown',
};

// const groupBy = (arr: Task[], getKey: (task: Task) => string) =>
// 	arr.reduce((groups, item) => {
// 		const key = getKey(item);
// 		(groups[key] ||= []).push(item);
// 		return groups;
// 	}, {} as Record<PropertyKey, Task[]>);
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
	List: styled.div`
		width: 100%;
		display: flex;
		flex-direction: column;

		/* gap: 0.5rem; */
	`,
	NoContentWrapper: styled.div`
		display: flex;
		flex-direction: column;
		min-height: 300px;
		justify-content: center;
	`,
	KpiWrapper: styled.div`
		display: flex;
	`,
	Header: styled.div`
		display: flex;
	`,
};

const AssignmentList = ({ source, tasks }: { source?: TaskSource; tasks: Task[] }) => {
	const assignments = useMemo(() => tasks?.filter((item) => (source ? item.source === source : true)), [tasks]);

	return (
		<StyledAssignmentsList>
			{assignments.length > 0 ? (
				assignments.map((item) => <TaskItem key={item.id} {...item} />)
			) : (
				<Style.NoContentWrapper>
					<PortalMessage title={`No work assigned`} type="Info">
						It appears you don´t have any {source ? source.toLowerCase() + ' tasks' : 'tasks'}
					</PortalMessage>
				</Style.NoContentWrapper>
			)}
		</StyledAssignmentsList>
	);
};

export const Tasks: FC<TasksProps> = ({ maxDisplay }) => {
	const [groupedBy, setGroupedBy] = useState<keyof typeof groupOption>('Category');
	const assignments = useAssignment().slice(0, maxDisplay ? maxDisplay : -1);

	const [activeTab, setActiveTab] = useState(0);

	const handleChange = (index: number) => {
		setActiveTab(index);
	};

	const counts = useMemo(() => {
		const count: Record<TaskSource, number> = {
			Meetings: 0,
			PIMS: 0,
			ProCoSys: 0,
			Review: 0,
			'Query & NC Request': 0,
		};

		assignments.forEach((a) => {
			count[a.source]++;
		});

		return count;
	}, [assignments]);

	return (
		<Style.Wrapper>
			<Style.Header>
				<Style.KpiWrapper>
					<StyledKpiItem>
						<StyledKpi>
							<Typography variant="h5">{assignments.length}</Typography>
							<Icon data={time} />
						</StyledKpi>
						<StyledTitle>Pending tasks</StyledTitle>
					</StyledKpiItem>
					<StyledKpiItem>
						<StyledKpi>
							<Typography variant="h5">{assignments.filter((a) => a.isOverdue).length}</Typography>
							<Icon data={warning_outlined} />
						</StyledKpi>
						<StyledTitle>Over Due task</StyledTitle>
					</StyledKpiItem>
				</Style.KpiWrapper>

				<Autocomplete
					options={Object.keys(groupOption)}
					autoWidth={true}
					hideClearButton={true}
					label={'Group by'}
					selectedOptions={[groupedBy]}
					onOptionsChange={(changes) => setGroupedBy(changes.selectedItems[0] as keyof typeof groupOption)}
				/>
			</Style.Header>
			<StyledAssignmentsListWrapper>
				<Tabs activeTab={activeTab} onChange={handleChange}>
					<Tabs.List>
						<Tabs.Tab>All ({assignments.length})</Tabs.Tab>
						<Tabs.Tab>Meetings ({counts.Meetings})</Tabs.Tab>
						<Tabs.Tab>Review ({counts.Review})</Tabs.Tab>
						<Tabs.Tab>PIMS ({counts.PIMS})</Tabs.Tab>
						<Tabs.Tab>ProCoSys ({counts.ProCoSys})</Tabs.Tab>
						<Tabs.Tab>Query & NC Request ({counts['Query & NC Request']})</Tabs.Tab>
					</Tabs.List>
					<Tabs.Panels>
						<Tabs.Panel>
							<AssignmentList tasks={assignments} />
						</Tabs.Panel>
						<Tabs.Panel>
							<AssignmentList tasks={assignments} source="Meetings" />
						</Tabs.Panel>
						<Tabs.Panel>
							<AssignmentList tasks={assignments} source="Review" />
						</Tabs.Panel>
						<Tabs.Panel>
							<AssignmentList tasks={assignments} source="PIMS" />
						</Tabs.Panel>
						<Tabs.Panel>
							<AssignmentList tasks={assignments} source="ProCoSys" />
						</Tabs.Panel>
						<Tabs.Panel>
							<AssignmentList tasks={assignments} source="Query & NC Request" />
						</Tabs.Panel>
					</Tabs.Panels>
				</Tabs>
			</StyledAssignmentsListWrapper>
		</Style.Wrapper>
	);
};
