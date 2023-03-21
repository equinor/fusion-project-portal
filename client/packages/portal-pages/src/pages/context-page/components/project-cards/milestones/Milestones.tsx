import { Button, EdsProvider, Icon, Slider, Table, Typography } from '@equinor/eds-core-react';
import Skeleton, { SkeletonVariant } from '@equinor/fusion-react-skeleton';
import { DateTime } from 'luxon';

import { StyledCardWrapper, StyledContent, StyledHeader } from '../styles';
import { useMilestoneQuery } from './use-presence-query';

function verifyDate(date: string): string {
	return new Date(date).toString() !== 'Invalid Date'
		? DateTime.fromJSDate(new Date(date)).toFormat('dd LLL yyyy')
		: '-';
}

const LoadingSkeleton = () => (
	<>
		<Table.Row>
			<Table.Cell>
				<Skeleton variant={SkeletonVariant.Text} />
			</Table.Cell>
			<Table.Cell>
				<Skeleton variant={SkeletonVariant.Text} />
			</Table.Cell>
			<Table.Cell>
				<Skeleton variant={SkeletonVariant.Text} />
			</Table.Cell>
			<Table.Cell>
				<Skeleton variant={SkeletonVariant.Text} />
			</Table.Cell>
		</Table.Row>
		<Table.Row>
			<Table.Cell>
				<Skeleton variant={SkeletonVariant.Text} />
			</Table.Cell>
			<Table.Cell>
				<Skeleton variant={SkeletonVariant.Text} />
			</Table.Cell>
			<Table.Cell>
				<Skeleton variant={SkeletonVariant.Text} />
			</Table.Cell>
			<Table.Cell>
				<Skeleton variant={SkeletonVariant.Text} />
			</Table.Cell>
		</Table.Row>
		<Table.Row>
			<Table.Cell>
				<Skeleton variant={SkeletonVariant.Text} />
			</Table.Cell>
			<Table.Cell>
				<Skeleton variant={SkeletonVariant.Text} />
			</Table.Cell>
			<Table.Cell>
				<Skeleton variant={SkeletonVariant.Text} />
			</Table.Cell>
			<Table.Cell>
				<Skeleton variant={SkeletonVariant.Text} />
			</Table.Cell>
		</Table.Row>
		<Table.Row>
			<Table.Cell>
				<Skeleton variant={SkeletonVariant.Text} />
			</Table.Cell>
			<Table.Cell>
				<Skeleton variant={SkeletonVariant.Text} />
			</Table.Cell>
			<Table.Cell>
				<Skeleton variant={SkeletonVariant.Text} />
			</Table.Cell>
			<Table.Cell>
				<Skeleton variant={SkeletonVariant.Text} />
			</Table.Cell>
		</Table.Row>
	</>
);

export const Milestones = () => {
	const { data } = useMilestoneQuery();

	return (
		<StyledCardWrapper>
			<StyledHeader>
				<Typography variant="h5">Milestones</Typography>
			</StyledHeader>
			<StyledContent>
				<EdsProvider density="compact">
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
							{data ? (
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
								<LoadingSkeleton />
							)}
						</Table.Body>
					</Table>
				</EdsProvider>
			</StyledContent>
		</StyledCardWrapper>
	);
};
