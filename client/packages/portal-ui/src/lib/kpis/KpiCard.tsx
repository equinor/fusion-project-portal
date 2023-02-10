

import styled from 'styled-components';
import { Card, Typography } from '@equinor/eds-core-react';
import { KpiCardItem } from './KpiItem';
import { KpiItem } from './types';


export const StyledKpiCard = styled(Card)`
	display: flex;
	gap: 2em;
	padding-left: 1rem;
`;

export const StyledContent = styled(Card.Content)`
	display: flex;
    flex-direction: row;
	gap: 2em;
	
`;

interface StatusBarProps {
    title: string;
	items: KpiItem[];
}

export function KpiCard({ items, title}: StatusBarProps): JSX.Element | null {
	if (!items.length) return null;

	return (
		<StyledKpiCard id="status_bar_root">
            <Card.Header>
                <Typography variant="h5" >{title}</Typography>
            </Card.Header>
            <StyledContent>
			{
                items.map((item) => (
                    <KpiCardItem key={item.title} item={item} />
                    ))
            }
             </StyledContent>
		</StyledKpiCard>
	);
}



