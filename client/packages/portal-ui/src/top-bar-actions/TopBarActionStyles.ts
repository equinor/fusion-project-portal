import { Button, Menu } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const StyledMenuItem = styled(Menu.Item)`
	min-width: 280px;
	padding: 0px;
	padding-left: 24px;
	padding-right: 8px;
	height: 48px;
`;

export const StyledItem = styled.div`
	min-width: 250px;
	padding-left: 0.5rem;
`;

export const StyledTopBarButton = styled(Button)`
	height: 40px;
	width: 40px;
	margin-left: 0.25rem;
`;

export const StyledActionMenuButton = styled(Button)`
	height: 48px;
	width: 48px;
`;

export const StyledActionFavoriteButton = styled.span`
	height: 48px;
	width: 48px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 40px;
	margin: 4px;
	width: 40px;

	:hover {
		background: #fefefe;
		border-radius: 50%;
	}
`;

export const StyledActionListWrapper = styled.span`
	display: flex;
`;
