import {  Button, Card, Icon, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { useAssignment } from './use-assignment';
import { DateTime } from 'luxon';
import { usePortalActions } from '@equinor/portal-core';
import { FC } from 'react';


const StyledCard = styled(Card)`
    height: 100%;
`;

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

const StyledAssignmentsList =styled.div`
    margin-top: 1rem;
`;

interface TaskProps {
    maxDisplay?: number
}

export const Tasks: FC<TaskProps> = ({maxDisplay}) => {

    const assignments = useAssignment().slice(0, maxDisplay ? maxDisplay : -1);
	return (
        <>
                <StyledKpiWrapper>
                    <StyledKpiItem>
                        <StyledKpi>
                            <Typography variant="h5">{assignments.length}</Typography>
                            <Icon name="time"/>
                        </StyledKpi>
                        <StyledTitle >Pending requests</StyledTitle>
                    </StyledKpiItem>
                    <StyledKpiItem>
                        <StyledKpi>
                            <Typography >0</Typography>
                            <Icon name="playlist_added"/>
                        </StyledKpi>
                        <StyledTitle variant="h5">Steps assigned to you</StyledTitle>
                    </StyledKpiItem>
                    <StyledKpiItem>
                        <StyledKpi>
                            <Typography variant="h5" color={tokens.colors.interactive.danger__resting.hex}>0</Typography>
                            <Icon name="assignment_important" color={tokens.colors.interactive.danger__resting.hex}/>
                        </StyledKpi>
                        <StyledTitle >Actions overdue</StyledTitle>
                    </StyledKpiItem>
                </StyledKpiWrapper>

                <StyledAssignmentsList>
                    {
                        assignments.map(assignment => (
                            <StyledTaskItem key={assignment.id}  href={assignment.url}>
                                <div>
                                    <Typography >{assignment.title}</Typography>
                                    <Typography variant='overline'>{assignment.sourceSystem.subSystem}</Typography>
                                </div>
                                <StyledRightText>

                                <Typography variant='overline'>
                                    {
                                    DateTime.fromJSDate(new Date(assignment.created)).toRelative() ?
                                        DateTime.fromJSDate(new Date(assignment.created)).toRelative() : "-"
                                         }
                                </Typography>
                                <Typography variant='overline' >{assignment.category}</Typography>
                                        </StyledRightText>
                            </StyledTaskItem>
                        ))
                    }
                </StyledAssignmentsList>
        </>
	
	);
};
export const WorkAssigned = () => {
    const actions  = usePortalActions()
  
	return (
		<StyledCard>
			<Card.Header>
				<Typography variant="h5">My Work Assigned</Typography>
			</Card.Header>
			<Card.Content>
               <Tasks/>
			</Card.Content>
            <Card.Actions>
                    <Button variant='ghost' onClick={()=>{
                        actions.setActiveActionById('task')
                    }}>
                        View all
                        <Icon name="chevron_right"/>
                    </Button>
            </Card.Actions>
		</StyledCard>
	);
};



const StyledRightText = styled.div`
    > p {
        text-align: right
        }
`;


const StyledTaskItem = styled.a`
    gap: 1rem;
    display: flex;
    margin-bottom: 0.5rem;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-top: 1px solid ${tokens.colors.ui.background__medium.hex};
    text-decoration: none;
    cursor: pointer;

    :hover > div > p{
        color: ${tokens.colors.interactive.focus.hex};
    }
`;
