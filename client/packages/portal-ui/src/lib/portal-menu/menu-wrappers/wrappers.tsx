import styled from 'styled-components';

export const StyledAppsWrapper = styled.div<{ count: number }>`
	padding: 1rem 0 1rem 1rem;
	height: 600px;
	display: block;
	grid-template-columns: auto;
	padding-bottom: 2rem;
	column-width: auto;
	column-count: ${({ count }) => count};
`;

export const StyledMenuWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	padding: 1rem 0 1rem 0;
	gap: 3rem;
	height: 90%;
`;

export const StyledCategoryWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem 1rem 1rem 0;
	white-space: nowrap;
	border-right: 1px solid #dcdcdc;
	height: 100%;
	width: 300px;
`;
