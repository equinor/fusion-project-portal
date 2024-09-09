import { Chip } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const AgStyles = {
	CellWrapper: styled.div`
		display: flex;
		justify-content: flex-end;
	`,
	Chip: styled(Chip)`
		margin-top: 0.5rem;
	`,
	TableContent: styled.div`
		position: relative;
		width: calc(100% - 2rem);
		height: 100%;
	`,

	Icon: styled.span`
		> svg {
			width: 25px;
		}
	`,
	Indicator: styled.span<{ active?: string }>`
		display: block;
		height: 16px;
		width: 16px;
		background-color: ${({ active }) =>
			active === 'true'
				? tokens.colors.interactive.success__resting.hex
				: tokens.colors.interactive.disabled__fill.hex};
		border-radius: 50%;
		margin-top: 0.5rem;
	`,
	Wrapper: styled.div`
		.ag-theme-alpine-fusion {
			--ag-borders: solid 0px !important;
		}
		.ag-header,
		.ag-advanced-filter-header {
			border-bottom: solid 1px var(--ag-border-color) !important;
		}
		//height: -webkit-fill-available;
		height: 100%;
		position: relative;
	`,
};
