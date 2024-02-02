import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Skeleton } from '@portal/ui';

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
	display: flex;
	min-height: 40px;
	flex: 1;

	min-width: 100px;
	width: fit-content;
`;

const Indicator = styled.span<{ color?: string }>`
	height: 54px;
	display: block;
	background-color: ${({ color }) => (color ? color : '#d2d2d2')};
	width: 8px;
	margin-right: 8px;
`;

type StatusBarItemProps = {
	/** Title to be shown above the value */
	title: string;
	subTitle: string;
	/** Value to be shown in the status bar */
	value?: string | number | null;
	description?: string;
	color?: string;
	isLoading?: boolean;
};
export function KpiCardItem(item: StatusBarItemProps) {
	return (
		<StyledStatusCardItem title={item.description} key={item.title}>
			<Indicator color={item.color} />
			<div>
				<StyledTitle>{item.title}</StyledTitle>
				<StyledValueWrapper>
					{item.isLoading ? (
						<Skeleton size="xSmall" height="24px" variant="text" />
					) : (
						<StyledValue>{item.value}</StyledValue>
					)}
				</StyledValueWrapper>
				<StyledTitle>{item.subTitle}</StyledTitle>
			</div>
		</StyledStatusCardItem>
	);
}
