import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { menuFavoritesController, useMenuContext } from '@equinor/portal-core';
import { useObservable } from '@equinor/portal-utils';
import { Link } from 'react-router-dom';
import { map } from 'rxjs';
import styled from 'styled-components';
import { styles } from '../styles';

const StyledIcon = styled(Icon)<{ isFavorite: boolean }>`
	visibility: ${({ isFavorite }) => (isFavorite ? 'visible' : 'hidden')};
`;

type StyledAppCardPops = {
	disabled?: boolean;
	selected: boolean;
};
const StyledAppCard = styled(Link)<StyledAppCardPops>`
	text-decoration: none;
	color: ${({ disabled }) =>
		disabled ? tokens.colors.text.static_icons__default.hex : tokens.colors.text.static_icons__default.hex};
	background: none;
	opacity: ${({ disabled }) => (disabled ? 0.5 : 'none')};
	display: flex;
	width: inherit;
	justify-content: space-between;
	align-items: center;
	font-weight: ${({ selected }) => (selected ? 700 : 400)};
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
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
		<li>
			<StyledAppCard
				className={styles.menuItem}
				disabled={isDisabled}
				selected={isActive}
				to={`/apps/${appKey}/`}
				id={`${appKey}-button`}
				title={
					isDisabled
						? `${name} is not available for the selected context`
						: `Application button for the application ${name}`
				}
				onClick={(e) => {
					if (isDisabled) {
						e.preventDefault();
						return;
					}
					closeMenu();
				}}
			>
				{name}
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
		</li>
	);
};
