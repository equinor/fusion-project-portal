import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const StyledNotificationTitle = styled.div`
	font-size: 14px;
`;
export const StyledTimeStamp = styled.div`
	font-size: 10px;
	font-weight: 500;
	text-align: right;
`;

export const StyledRightSection = styled.div`
	display: flex;
`;

export const StyledLeftSection = styled.div`
	display: flex;
	gap: 1em;
	flex-direction: row;
	align-items: flex-start;
	justify-content: flex-start;
`;

export const StyledWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr auto 80px;
	text-align: left;
	align-items: flex-start;
	justify-content: space-between;
	border-top: 1px ${tokens.colors.interactive.disabled__border.hex} solid;
	padding: 0.45rem 0em;
	cursor: pointer;
`;

export const StyledDetailText = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;
