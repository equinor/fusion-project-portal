import { Button, Card, Icon, Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { usePortalActions } from '@equinor/portal-core';
import { Tasks } from './Tasks';

const StyledCard = styled(Card)`
	height: 100%;
`;

export const WorkAssigned = () => {
	const actions = usePortalActions();

	return (
		<StyledCard>
			<Card.Header>
				<Typography variant="h5">My Work Assigned</Typography>
			</Card.Header>
			<Card.Content>
				<Tasks />
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
