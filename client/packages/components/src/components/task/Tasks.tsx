import { Tabs } from '@equinor/eds-core-react';
import { FC, useState } from 'react';
import styled from 'styled-components';

import { useAssignment } from './hooks/use-assignment';

import { TabNav } from './components/TaskNav';
import { TaskList } from './components/TaskList';
import { useTaskCount } from './hooks/use-task-count';

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
	const assignments = useAssignment().slice(0, maxDisplay ? maxDisplay : -1);

	const [activeTab, setActiveTab] = useState(0);

	const handleChange = (index: number) => {
		setActiveTab(index);
	};
	const count = useTaskCount(assignments);

	return (
		<Style.Wrapper>
			<Style.Header></Style.Header>
			<Style.TaskListWrapper>
				<Tabs activeTab={activeTab} onChange={handleChange}>
					<TabNav>
						<Tabs.Tab>All ({assignments.length})</Tabs.Tab>
						<Tabs.Tab>Meetings ({count.Meetings}) </Tabs.Tab>
						<Tabs.Tab>Review ({count.Review})</Tabs.Tab>
						<Tabs.Tab>PIMS ({count.PIMS})</Tabs.Tab>
						<Tabs.Tab>ProCoSys ({count.ProCoSys})</Tabs.Tab>
						<Tabs.Tab>Query & NC Request ({count['Query & NC Request']})</Tabs.Tab>
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
