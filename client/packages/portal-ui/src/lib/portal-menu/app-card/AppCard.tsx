import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { menuFavoritesController, useMenuContext } from '@equinor/portal-core';
import { useObservable } from '@equinor/portal-utils';
import { Link } from 'react-router-dom';
import { map } from 'rxjs';
import styled from 'styled-components';

const StyledIcon = styled(Icon)<{ isFavorite: boolean }>`
	visibility: ${({ isFavorite }) => (isFavorite ? 'visible' : 'hidden')};
`;
const StyledAppCard = styled(Link)`
	text-decoration: none;
	color: ${tokens.colors.text.static_icons__default.hex};
	background: none;
	border: none;
	height: 24px;
	display: flex;
	width: inherit;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	&:hover {
		background-color: ${tokens.colors.ui.background__light.hex};
		${StyledIcon} {
			visibility: visible;
		}
	}
`;

const StyledAppCardDisabled = styled(Link)`
	text-decoration: none;
	color: #999999;
	opacity: 0.6;
	background-color: #f5f5f5;
	border: none;
	height: 24px;
	display: flex;
	width: inherit;
	justify-content: space-between;
	align-items: center;
	cursor: not-allowed;
`;

type AppCardProps = {
	name: string;
	appKey: string;
	isDisabled: boolean;
};
export const AppCard = ({ name, appKey, isDisabled }: AppCardProps) => {
	const { closeMenu } = useMenuContext();
	const isFavorited = Boolean(
		useObservable(menuFavoritesController.favorites$.pipe(map((val) => val?.includes(appKey))))
	);

	return isDisabled ? (
		<StyledAppCardDisabled title={`${name} is not available for the selected context`} to={"/"} onClick={(e) => e.preventDefault()}>
			<span>{name}</span>
			<StyledIcon isFavorite={isFavorited} id={`${appKey}-favorite-button`} name="star_filled" />
		</StyledAppCardDisabled>
	) : (
		<StyledAppCard
			to={`/apps/${appKey}`}
			id={`${appKey}-button`}
			title={`Application button for the application ${name}`}
			onClick={closeMenu}
		>
			<span>{name}</span>
			<StyledIcon
				isFavorite={isFavorited}
				id={`${appKey}-favorite-button`}
				title={`App favorite button for ${name}`}
				onClick={(event) => {
					event.stopPropagation();
					event.preventDefault();
					menuFavoritesController.onClickFavorite(appKey);
				}}
				name={isFavorited ? 'star_filled' : 'star_outlined'}
			/>
		</StyledAppCard>
	);
};
