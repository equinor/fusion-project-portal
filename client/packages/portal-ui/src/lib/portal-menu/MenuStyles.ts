import { Scrim } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const MainMenuWrapper = styled.div`
	min-width: 310px;
	border-right: 1px solid ${tokens.colors.ui.background__medium.rgba};
	background-color: ${tokens.colors.ui.background__default.rgba};
`;

export const ChildrenWrapper = styled.div<{ sideSheetWidth?: number }>`
	height: 100%;
	width: 100%;
`;

export const MenuScrim = styled(Scrim)`
	animation: MenuScrimAnimation ease 0.3s;
	animation-iteration-count: 1;
	animation-fill-mode: forwards;
	top: 48px !important;
	height: calc(100vh - 48px);
	overflow: hidden !important;
	z-index: 2;
	@keyframes MenuScrimAnimation {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`;

export const MenuWrapper = styled.div`
	max-height: 100% !important;
	display: 'flex';
	flex-direction: 'column';
	gap: '1.2em';
	height: calc(100vh - 48px);
	position: absolute;
	width: 635px;
	background-color: white;
	top: 0px;
	left: 0px;
	padding: 1rem;
	background: ${tokens.colors.ui.background__default.rgba};
	transition: all 0.15s ease;
	z-index: 1;
	border-right: 1.5px solid #e0e0e0;

	animation: MenuWrapperAnimation ease 0.3s;
	animation-iteration-count: 1;
	animation-fill-mode: forwards;
	@keyframes MenuWrapperAnimation {
		0% {
			left: -900px;
		}
		100% {
			left: 0px;
		}
	}
`;
