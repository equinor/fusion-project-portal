import styled from 'styled-components';
import { useMemo } from 'react';
import { PortalMessage } from '@portal/ui';
import { Task, TaskSource } from '../types/task';
import { TaskItem } from './TaskItem';

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
	`,
	NoContentWrapper: styled.div`
		display: flex;
		flex-direction: column;
		min-height: 300px;
		justify-content: center;
	`,
	TaskList: styled.div`
		height: 100%;
		overflow: auto;
	`,
};

export const TaskList = ({ source, tasks }: { source?: TaskSource; tasks: Task[] }) => {
	const assignments = useMemo(() => tasks?.filter((item) => (source ? item.source === source : true)), [tasks]);

	return (
		<Style.TaskList>
			{assignments.length > 0 ? (
				assignments.map((item) => <TaskItem key={item.id} {...item} />)
			) : (
				<Style.NoContentWrapper>
					<PortalMessage title={`No work assigned`} type="Info">
						It appears you don´t have any {source ? source.toLowerCase() + ' tasks' : 'tasks'}
					</PortalMessage>
				</Style.NoContentWrapper>
			)}
		</Style.TaskList>
	);
};
