import { Tabs } from '@equinor/eds-core-react';
import { FC, useState } from 'react';
import styled from 'styled-components';

import { FusionTask } from './types/fusion-task';
import { useAssignment } from './hooks/use-assignment';
import { Task } from './types/task';
import { TabNav } from './components/TaskNav';
import { TaskList } from './components/TaskList';

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
	Header: styled.div`
		display: flex;
	`,

	TaskListWrapper: styled.div`
		flex: 2;
		overflow: hidden;
		padding-bottom: 1rem;
	`,
};

export const Tasks: FC<TasksProps> = ({ maxDisplay }) => {
	const [groupedBy, setGroupedBy] = useState<keyof typeof groupOption>('Category');
	const assignments = useAssignment().slice(0, maxDisplay ? maxDisplay : -1);

	const [activeTab, setActiveTab] = useState(0);

	const handleChange = (index: number) => {
		setActiveTab(index);
	};

	return (
		<Style.Wrapper>
			<Style.Header>
				{/* <Autocomplete
					options={Object.keys(groupOption)}
					autoWidth={true}
					hideClearButton={true}
					label={'Group by'}
					selectedOptions={[groupedBy]}
					onOptionsChange={(changes) => setGroupedBy(changes.selectedItems[0] as keyof typeof groupOption)}
				/> */}
			</Style.Header>
			<Style.TaskListWrapper>
				<Tabs activeTab={activeTab} onChange={handleChange}>
					<TabNav>
						<Tabs.Tab>All</Tabs.Tab>
						<Tabs.Tab>Meetings </Tabs.Tab>
						<Tabs.Tab>Review </Tabs.Tab>
						<Tabs.Tab>PIMS </Tabs.Tab>
						<Tabs.Tab>ProCoSys </Tabs.Tab>
						<Tabs.Tab>Query & NC Request </Tabs.Tab>
					</TabNav>
					<Tabs.Panels>
						<Tabs.Panel>
							<TaskList tasks={assignments} />
						</Tabs.Panel>
						<Tabs.Panel>
							<TaskList tasks={assignments} source="Meetings" />
						</Tabs.Panel>
						<Tabs.Panel>
							<TaskList tasks={assignments} source="Review" />
						</Tabs.Panel>
						<Tabs.Panel>
							<TaskList tasks={assignments} source="PIMS" />
						</Tabs.Panel>
						<Tabs.Panel>
							<TaskList tasks={assignments} source="ProCoSys" />
						</Tabs.Panel>
						<Tabs.Panel>
							<TaskList tasks={assignments} source="Query & NC Request" />
						</Tabs.Panel>
					</Tabs.Panels>
				</Tabs>
			</Style.TaskListWrapper>
		</Style.Wrapper>
	);
};
