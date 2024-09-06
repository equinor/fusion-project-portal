import { styled } from 'styled-components';

export const AgStyle = styled.div`
	.ag-theme-alpine-fusion {
		--ag-borders: solid 0px !important;
	}
	.ag-header,
	.ag-advanced-filter-header {
		border-bottom: solid 1px var(--ag-border-color) !important;
	}
	height: -webkit-fill-available;
	position: relative;
`;
