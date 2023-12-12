import { EdsProvider, Table, Typography } from '@equinor/eds-core-react';
import { DateTime } from 'luxon';
import { StyledCardWrapper, StyledContent, StyledHeader } from '../styles';
import { LoadingSkeleton } from './LoadingSection';
import { useMilestoneQuery } from './use-presence-query';
import { css } from '@emotion/css';
import { PortalMessage } from '@portal/ui';

function verifyDate(date: string): string {
	return new Date(date).toString() !== 'Invalid Date'
		? DateTime.fromJSDate(new Date(date)).toFormat('dd LLL yyyy')
		: '-';
}

const styles = {
	fullWidth: css`
		width: 100%;
	`,
	noContent: css`
		width: 100%;
		height: 200px;
		display: flex;
		justify-content: center;
	`,
};

export const Milestones = () => {
	const { data, isLoading, error } = useMilestoneQuery();

	const componentError = error as Error | undefined;

	return (
		<StyledCardWrapper>
			<StyledHeader>
				<Typography variant="h5">Milestones</Typography>
			</StyledHeader>
			{componentError ? (
				componentError.message.toLowerCase() === 'No Access'.toLowerCase() ? (
					<div className={styles.noContent}>
						<PortalMessage type="Warning" title="No access">
							You don't have access to see this information for this project.
						</PortalMessage>
					</div>
				) : (
					<div className={styles.noContent}>
						<PortalMessage type="Error" title="Error">
							{componentError.message}
						</PortalMessage>
					</div>
				)
			) : (
				<StyledContent>
					<EdsProvider density="compact">
						<Table className={styles.fullWidth}>
							<Table.Head>
								<Table.Row>
									<Table.Cell>Milestone</Table.Cell>
									<Table.Cell>Description</Table.Cell>
									<Table.Cell>Planned</Table.Cell>
									<Table.Cell>Forecast</Table.Cell>
								</Table.Row>
							</Table.Head>
							<Table.Body>
								{isLoading ? (
									<LoadingSkeleton />
								) : data ? (
									data.map((milestone) => {
										const datePlanned = verifyDate(milestone.datePlanned);
										const dateForecast = verifyDate(milestone.dateForecast);
										return (
											<Table.Row key={milestone.milestone}>
												<Table.Cell>{milestone.milestone}</Table.Cell>
												<Table.Cell>{milestone.description}</Table.Cell>
												<Table.Cell>{datePlanned}</Table.Cell>
												<Table.Cell>{dateForecast}</Table.Cell>
											</Table.Row>
										);
									})
								) : (
									<div className={styles.noContent}>
										<PortalMessage type="NoContent" title="No content">
											There are no milestones awaitable
										</PortalMessage>
									</div>
								)}
							</Table.Body>
						</Table>
					</EdsProvider>
				</StyledContent>
			)}
		</StyledCardWrapper>
	);
};
