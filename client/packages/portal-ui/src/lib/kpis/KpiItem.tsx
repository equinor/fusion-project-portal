


import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { KpiItem } from './types';

const StyledValue = styled.div`
    color: ${tokens.colors.text.static_icons__default.hex};
    font-size: 20px;
    line-height: 24px;
`;

const StyledValueWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.2em;
`;

const StyledTitle = styled.div`
    color: ${tokens.colors.text.static_icons__tertiary.hex};
    font-size: 12px;
    line-height: 16px;
`;

const StyledStatusCardItem = styled.div`
    min-height: 40;
    min-width: 70;
    width: fit-content;
`;


interface StatusBarItemProps {
	item: KpiItem;
}
export function KpiCardItem({ item }: StatusBarItemProps) {
	return (
		<StyledStatusCardItem title={item.description} key={item.title}>
			<StyledTitle>{item.title}</StyledTitle>
			<StyledValueWrapper>
				<StyledValue>{item.value}</StyledValue>
			</StyledValueWrapper>
		</StyledStatusCardItem>
	);
}

