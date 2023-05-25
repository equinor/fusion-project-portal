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
const StyledAppCard = styled(Link)<{ isDisabled: boolean }>`
	text-decoration: none;
	color: ${({ isDisabled }) =>
		isDisabled ? tokens.colors.text.static_icons__default.hex : tokens.colors.text.static_icons__default.hex};
	background: none;
	opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 'none')};
	border: none;
	height: 24px;
	display: flex;
	width: inherit;
	justify-content: space-between;
	align-items: center;
	cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
	&:hover {
		background-color: ${tokens.colors.ui.background__light.hex};
		${StyledIcon} {
			visibility: visible;
		}
	}
`;

type AppCardProps = {
	name: string;
	appKey: string;
	isActive: boolean;
	isDisabled: boolean;
};
export const AppCard = ({ name, appKey, isActive, isDisabled }: AppCardProps) => {
	const { closeMenu } = useMenuContext();
	const isFavorited = Boolean(
		useObservable(menuFavoritesController.favorites$.pipe(map((val) => val?.includes(appKey))))
	);

	return (
		<>
			{isDisabled ? (
				<StyledAppCard
					title={`${name} is not available for the selected context`}
					to={'/'}
					onClick={(e) => e.preventDefault()}
					isDisabled={isDisabled}
				>
					{isActive ? <b>{name}</b> : <span>{name}</span>}
					<StyledIcon isFavorite={isFavorited} name={isFavorited ? 'star_filled' : 'star_outlined'} />
				</StyledAppCard>
			) : (
				<StyledAppCard
					isDisabled={isDisabled}
					to={`/apps/${appKey}`}
					id={`${appKey}-button`}
					title={`Application button for the application ${name}`}
					onClick={closeMenu}
				>
					{isActive ? <b>{name}</b> : <span>{name}</span>}
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
			)}
		</>
	);
};
