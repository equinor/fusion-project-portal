import { Tabs, TabsProps } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const StyledContentWrapper = styled.div`
	padding: 1em;
`;

export const StyledTabs: (props: TabsProps) => JSX.Element = styled(Tabs)`
	display: grid;
	grid-template-rows: auto 1fr;
	position: relative;
`;

export const StyledPanels = styled(Tabs.Panels)`
	overflow: auto;
`;

export const StyledTabListWrapper = styled.div`
	overflow: hidden;
	width: 100%;
	background-color: ${tokens.colors.ui.background__light.hex};
`;
