import React from 'react';

import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Button, Typography } from '@equinor/eds-core-react';
import { ActiveIncidentsList } from './ActiveIncidentsList';

const Styles = {
	Wrapper: styled.div`
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	`,
	ButtonsWrapper: styled.div`
		padding-top: 1rem;
		display: flex;
		align-items: stretch;
		flex-direction: column;
		gap: ${tokens.spacings.comfortable.small};
	`,
};

type ActiveIncidentsProps = {
	openNewIncident: () => void;
};

export const ActiveIncidents = ({ openNewIncident }: ActiveIncidentsProps): JSX.Element => {
	return (
		<Styles.Wrapper>
			<Typography variant="h6">My active Fusion incidents</Typography>
			<ActiveIncidentsList />
			<hr />
			<Styles.ButtonsWrapper>
				<Button color="primary" label="Report an Error" onClick={openNewIncident}>
					Report an Error
				</Button>
				<Button
					href="https://equinor.service-now.com/selfservice?id=sc_cat_item&sys_id=32d7c0cddb2d630023a69407db961900"
					target="_blank"
					variant="ghost"
					color="primary"
					as={'a'}
				>
					Submit an improvement suggestion
				</Button>
			</Styles.ButtonsWrapper>
		</Styles.Wrapper>
	);
};

export default ActiveIncidents;
