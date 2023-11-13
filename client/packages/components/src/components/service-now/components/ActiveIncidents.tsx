import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Button, Divider, Icon, Typography } from '@equinor/eds-core-react';
import { Tooltip } from '@equinor/fusion-react-tooltip';
import { ActiveIncidentsList } from './ActiveIncidentsList';
import { info_circle } from '@equinor/eds-icons';
import { ActiveIncidentStateTooltip } from './ActiveIncidentStateTooltip';

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
	HeadingWrapper: styled.div`
		display: flex;
		justify-content: space-between;
	`,
};

type ActiveIncidentsProps = {
	openNewIncident: () => void;
};

export const ActiveIncidents = ({ openNewIncident }: ActiveIncidentsProps): JSX.Element => {
	return (
		<Styles.Wrapper>
			<Styles.HeadingWrapper>
				<Typography variant="h6">My active Fusion incidents</Typography>
				<Tooltip content={<ActiveIncidentStateTooltip />}>
					<Icon data={info_circle} color={tokens.colors.interactive.primary__resting.hex} />
				</Tooltip>
			</Styles.HeadingWrapper>
			<ActiveIncidentsList />
			<Divider />
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
