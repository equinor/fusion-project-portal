import { Button, Card, Icon, Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { usePortalActions } from '@equinor/portal-core';
import { Tasks } from '../Tasks';
import { useDivHeight } from '../hooks/use-client-width';

const StyledCard = styled(Card)`
	height: 100%;
	display: flex;
`;
const StyledContentHeight = styled.div`
	width: 100%;
	height: auto;
	overflow: auto;
`;

export const WorkAssigned = () => {
	const actions = usePortalActions();
	const { ref, divHeight } = useDivHeight();
	return (
		<StyledCard>
			<Card.Header>
				<Typography variant="h5">My Work Assigned</Typography>
			</Card.Header>
			<Card.Content>
				<StyledContentHeight ref={ref}>
					<Tasks height={divHeight} />
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
