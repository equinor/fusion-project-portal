import {  Button, EdsProvider, Icon, Slider, Table, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { DateTime } from 'luxon';


import { StyledCardWrapper, StyledContent, StyledHeader } from '../styles';
import { useMilestoneQuery } from './use-presence-query';

function verifyDate (date: string): string {
    return new Date(date).toString() !== "Invalid Date" ? DateTime.fromJSDate(new Date(date)).toFormat("dd LLL yyyy"): "-";
} 

export const Milestones = () => {
    const {data} = useMilestoneQuery() 

	return (
		<StyledCardWrapper>
			<StyledHeader>
				<Typography variant="h5">Milestones</Typography>
			</StyledHeader>
			<StyledContent>

            <EdsProvider density='compact'>
            <Table>
                <Table.Head>
                    <Table.Row>
                        <Table.Cell>Milestone</Table.Cell>
                        <Table.Cell>Description</Table.Cell>
                        <Table.Cell>Planned</Table.Cell>
                        <Table.Cell>Forecast</Table.Cell>
              
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {data?.map((milestone) => { 
                        const datePlanned = verifyDate(milestone.datePlanned); 
                        const dateForecast = verifyDate(milestone.dateForecast);
                        return (  <Table.Row >
                        <Table.Cell>{milestone.milestone}</Table.Cell>
                        <Table.Cell>{milestone.description}</Table.Cell>
                        <Table.Cell>{datePlanned}</Table.Cell>
                        <Table.Cell>{dateForecast}</Table.Cell>
                    </Table.Row>);
                    })
                    } 
                </Table.Body>
            </Table>
            </EdsProvider>
			</StyledContent>
            <StyledCardWrapper.Actions alignRight={true}>
                <Button variant='ghost' disabled={true}>
                    Go to app
                    <Icon name="chevron_right"/>
                </Button>
            </StyledCardWrapper.Actions>
		</StyledCardWrapper>
	);
};
