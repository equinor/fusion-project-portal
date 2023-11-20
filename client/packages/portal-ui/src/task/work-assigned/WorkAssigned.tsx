import { Button, Card, Icon, Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { usePortalActions } from '@equinor/portal-core';
import { Tasks } from './Tasks';

const StyledCard = styled(Card)`
	height: 100%;
	display: flex;
`;
const StyledContentHeight = styled.div`
	margin-top: 1rem;
	height: 1000px;
`;

export const WorkAssigned = () => {
	const actions = usePortalActions();

	return (
		<StyledCard>
			<Card.Header>
				<Typography variant="h5">My Work Assigned</Typography>
			</Card.Header>
			<Card.Content>
				<StyledContentHeight>
					<Tasks />
				</StyledContentHeight>
			</Card.Content>
			<Card.Actions>
				<Button
					variant="ghost"
					onClick={() => {
						actions.setActiveActionById('task');
					}}
				>
					View all
					<Icon name="chevron_right" />
				</Button>
			</Card.Actions>
		</StyledCard>
	);
};
