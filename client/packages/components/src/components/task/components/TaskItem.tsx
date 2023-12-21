import { Chip, Icon, Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
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
		align-items: flex-start;
		justify-content: space-between;
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
		align-items: center;
		gap: 0.5rem;

		> * {
			font-size: small;
		}
	`,
	TaskContent: styled.div`
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: space-between;
		align-items: flex-start;
	`,
	Title: styled.div`
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
		padding-bottom: 0.5rem;
	`,
	Description: styled.pre`
		margin: 0;
		padding-bottom: 0.5rem;
	`,
};

const getOverdueColor = (isOverdue?: boolean) =>
	isOverdue === undefined
		? tokens.colors.text.static_icons__default.hex
		: isOverdue
		? tokens.colors.interactive.danger__resting.hex
		: tokens.colors.interactive.success__resting.hex;
export const TaskItem = (task: Task) => {
	const { title, href, state, source, type, isOverdue, description, dueDate, isExternal, project, priority } = task;
	return (
		<Style.TaskItem>
			<Style.TaskContent>
				<Style.Title>
					<Icon size={18} data={assignment} color={getOverdueColor(isOverdue)} />
					<Typography
						as={'a'}
						variant="h6"
						title="Title"
						href={href}
						target={isExternal ? '_blank' : '_self'}
						color={tokens.colors.interactive.primary__resting.hex}
					>
						{title}
					</Typography>
					<Chip variant="default">{source}</Chip>
				</Style.Title>
				{description && <Style.Description title={'Title'}>{description}</Style.Description>}
				<Style.TaskItemChildren>
					{state && (
						<Chip variant="default" disabled={state === 'Closed'} title={'State'}>
							{state}
						</Chip>
					)}
					{type && (
						<Chip variant="default" title={`Task type ${type.toLocaleLowerCase()}`}>
							{type}
						</Chip>
					)}
					{priority && (
						<Chip variant="default" title="Priority">
							{priority}
						</Chip>
					)}
					{project && (
						<Chip variant="default" title="Project">
							{project}
						</Chip>
					)}
					{dueDate && (
						<>
							<Icon size={16} data={calendar} color={getOverdueColor(isOverdue)} />
							<span title={'Due Date'}>{dueDate}</span>
						</>
					)}
				</Style.TaskItemChildren>
			</Style.TaskContent>

			{isExternal && (
				<Typography as={'a'} title="External link" href={href} target={isExternal ? '_blank' : '_self'}>
					<Icon size={18} data={external_link} />
				</Typography>
			)}
		</Style.TaskItem>
	);
};
