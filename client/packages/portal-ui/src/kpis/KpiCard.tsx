import styled from 'styled-components';
import { Card, Typography } from '@equinor/eds-core-react';
import { KpiCardItem } from './KpiItem';
import { KpiItem } from './types';
import { Skeleton } from '@equinor/fusion-react-skeleton';
import { tokens } from '@equinor/eds-tokens';

const StyledKpiCard = styled(Card)`
	display: flex;
	gap: 0px;
`;

const StyledContent = styled(Card.Content)`
	display: flex;
	flex-direction: row;
	gap: 2rem;
	overflow: auto;
	margin-top: 1rem;
	width: inherit;
`;

const StyleSkeleton = styled(Skeleton)`
	min-width: 50px;
	max-width: 60px;
	height: 25px;
`;

type StatusBarProps = {
	title: string;
	items: KpiItem[];
	isLoading: boolean;
	error?: Error;
};

export function KpiCard({ items, title, isLoading, error }: StatusBarProps): JSX.Element | null {
	return (
		<StyledKpiCard id="status_bar_root">
			<Card.Header>
				<Typography variant="h5">{title}</Typography>
			</Card.Header>
			{error ? (
				<StyledContent>
					<Typography color={tokens.colors.interactive.disabled__text.hex} variant="h6">
						{error.message}
					</Typography>
				</StyledContent>
			) : (
				<StyledContent>
					{items.map((item) => (
						<span key={item.title}>{isLoading ? <StyleSkeleton /> : <KpiCardItem item={item} />}</span>
					))}
				</StyledContent>
			)}
		</StyledKpiCard>
	);
}
