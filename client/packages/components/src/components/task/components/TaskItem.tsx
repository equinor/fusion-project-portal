import styled from 'styled-components';
import { Chip, Icon, Typography } from '@equinor/eds-core-react';
import { assignment, calendar, external_link, refresh } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { Task } from '../types/task';

export type TaskItemProp = {
	title: string;
	href?: string;
	external?: boolean;
};

const Style = {
	TaskItem: styled.div`
		display: flex;
		flex-direction: row;
		padding: 0.5rem;
		gap: 0.5rem;
		:hover {
			background-color: ${tokens.colors.interactive.primary__hover_alt.hex};
		}
		border-bottom: 1px solid #e3e3e3;
		:last-of-type {
			border-bottom: none;
		}
	`,
	TaskItemChildren: styled.div`
		display: flex;
		flex-direction: row;
		align-content: center;
		gap: 0.5rem;
	`,
	TaskContent: styled.div`
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: space-between;
	`,
	Title: styled.div`
		display: flex;
		flex-direction: row;
		align-content: center;
		gap: 0.5rem;
		padding-bottom: 1rem;
	`,
};

export const TaskItem = (task: Task) => {
	const { title, href, state, source, type, isOverdue, description, dueDate, isExternal } = task;
	return (
		<Style.TaskItem>
			<div>{isExternal ? <Icon data={external_link} /> : <Icon data={assignment} />}</div>
			<Style.TaskContent>
				<Style.Title>
					<Typography
						as={'a'}
						variant="h5"
						title="Title"
						href={href}
						target={isExternal ? '_blank' : '_self'}
					>
						{title}
					</Typography>
					<Chip variant="default">{source}</Chip>
				</Style.Title>
				<Style.TaskItemChildren>
					<span title={'Title'}>{description}</span>
					<Chip variant="default" disabled={state === 'Closed'} title={'State'}>
						<Icon size={16} data={refresh} />
						{state}
					</Chip>
					<Chip variant="default">{type}</Chip>
					{dueDate && (
						<>
							<Icon
								size={16}
								data={calendar}
								color={isOverdue === undefined ? 'grey' : isOverdue ? 'red' : 'green'}
							/>
							<span title={'Due Date'}>{dueDate}</span>
						</>
					)}
				</Style.TaskItemChildren>
			</Style.TaskContent>
		</Style.TaskItem>
	);
};
