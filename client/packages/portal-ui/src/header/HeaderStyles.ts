import { TopBar } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const StyledHeader = styled(TopBar.Header)`
	width: max-content;
`;

export const StyledTopBar = styled(TopBar)`
	padding: 0px;
	grid-column-gap: 0px;
	height: var(--header-height);
`;

export const StyledCustomContent = styled(TopBar.CustomContent)`
	display: flex;
	align-items: center;
	@media only screen and (max-width: 45rem) {
		display: none;
	}
`;

export const StyledActionsWrapper = styled(TopBar.Actions)`
	padding-right: 0.5rem;
`;
