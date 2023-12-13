import { EdsProvider, Table, Typography } from '@equinor/eds-core-react';
import { DateTime } from 'luxon';
import { StyledCardWrapper, StyledContent, StyledHeader } from '../styles';
import { LoadingSkeleton } from './LoadingSection';
import { useMilestoneQuery } from './use-presence-query';
import { css } from '@emotion/css';
import { PortalMessage } from '@portal/ui';
import { sortByDate, sortMilestones } from './utils';
import { useMemo } from 'react';

function verifyDate(date?: string | null): string {
	return new Date(date || '').toString() !== 'Invalid Date'
		? DateTime.fromJSDate(new Date(date || '')).toFormat('dd LLL yyyy')
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
	noWrap: css`
		width: 1000px;
		overflow: hidden;
		text-overflow: ellipsis;
	`,
	table: css`
		white-space: nowrap;
		min-width: fit-content;
		table-layout: fixed;
	`,
};

export const Milestones = () => {
	const { data, isLoading, error } = useMilestoneQuery();

	const componentError = error as Error | undefined;

	const milestones = useMemo(() => {
		return data?.sort(sortMilestones).sort(sortByDate) || [];
	}, [data]);

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
						<Table className={(styles.fullWidth, styles.table)}>
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
								) : milestones.length > 0 ? (
									milestones.map((milestone) => {
										const datePlanned = verifyDate(milestone.datePlanned);
										const dateForecast = verifyDate(milestone.dateForecast);
										return (
											<Table.Row key={milestone.milestone}>
												<Table.Cell title={milestone.milestone}>
													{milestone.milestone}
												</Table.Cell>
												<Table.Cell className={styles.noWrap} title={milestone.description}>
													{milestone.description}
												</Table.Cell>
												<Table.Cell title={datePlanned}>{datePlanned}</Table.Cell>
												<Table.Cell title={dateForecast}>{dateForecast}</Table.Cell>
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
