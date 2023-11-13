import styled from 'styled-components';
import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';
import { Incident } from '../types/types';
import { getIncidentColorByState } from '../utils/get-incident-color-by-state';

export const Style = {
	IncidentItem: styled.div`
		display: flex;
		position: relative;
		box-shadow: 0 2px 5px rgb(0 0 0 / 10%), 0 3px 4px rgb(0 0 0 / 10%), 0 2px 4px rgb(0 0 0 / 0%);
		width: calc(100% - 2rem);
		padding: 1rem;
		align-items: center;
		justify-content: space-between;
	`,
	IncidentIndicator: styled.span<{ color: string }>`
		position: absolute;
		display: block;
		left: 0;
		width: 8px;
		height: 100%;
		background-color: ${({ color }) => color};
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	`,
	IncidentContent: styled.div`
		padding-left: 1rem;
	`,
};

export const ActiveIncidentsItem = (incident: Incident) => {
	return (
		<Style.IncidentItem key={incident.id}>
			<Style.IncidentIndicator color={getIncidentColorByState(incident.state)} />
			<div>
				<Button as={'a'} variant="ghost" href={incident.link} target="_blank" fullWidth>
					{incident.number}
				</Button>

				<Style.IncidentContent>
					<Typography variant="h6">{incident.shortDescription}</Typography>
					<Typography variant="overline">Status: {incident.state}</Typography>
				</Style.IncidentContent>
			</div>
			<Button variant="ghost_icon" as={'a'} href={incident.link} target="_blank">
				<Icon data={external_link} />
			</Button>
		</Style.IncidentItem>
	);
};
