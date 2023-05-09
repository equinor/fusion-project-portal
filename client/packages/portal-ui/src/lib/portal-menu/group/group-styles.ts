import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

export const StyledGroup = styled.div`
	display: flex;
	gap: 0.5em;
	min-width: 300px;
	width: auto;
	align-items: flex-start;
`;

export const StyledChildrenWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: inherit;
`;

export const StyledGroupBody = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1em;
	width: inherit;
`;

export const StyledMenuGroupName = styled.div`
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	color: ${tokens.colors.text.static_icons__default.hex};
`;
