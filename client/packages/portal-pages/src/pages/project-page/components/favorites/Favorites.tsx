import { useTelemetry } from '@equinor/portal-core';
import { Card, Icon, Popover, Typography } from '@equinor/eds-core-react';

import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { info_circle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useRef, useState } from 'react';
import { useFavorites } from '../../hooks/use-favorites';
import FavoriteCard from './FavoriteCard';

type AppCardPops = {
	isDisabled?: boolean;
	color?: string;
};

const styles = {
	appCard: ({ isDisabled, color }: AppCardPops) => {
		const iconBackgroundColor = (color ? color : tokens.colors.infographic.primary__moss_green_100.hex) + '66';
		return css`
			opacity: ${isDisabled ? 0.5 : 'none'};
			cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
			display: flex;
			flex-direction: row;
			gap: 1rem;
			overflow: hidden;
			text-decoration: none;
			:hover {
				> aside > span {
					background-color: ${!isDisabled && iconBackgroundColor};
				}
			}
		`;
	},
	cardList: css`
		display: grid;
		grid-auto-rows: auto;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		padding: 0;

		@media only screen and (max-width: 45rem) {
			grid-template-columns: repeat(1, 1fr);
		}
	`,
	noData: css`
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		grid-column: span 3;
	`,
	fullHeight: css`
		height: 100%;
	`,
	Heading: styled.div`
		padding: 1rem;
		display: flex;
		justify-content: space-between;
	`,
};

export const Favorites = () => {
	const referenceElement = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	// const { dispatchEvent } = useTelemetry();

	const { favorites, disabledAppKeys, hasFavorites, isLoading, addFavorite } = useFavorites();

	return (
		<div>
			<styles.Heading>
				<Typography variant="h5">Pinned Apps</Typography>
				<div
					onMouseOver={() => {
						setIsOpen(true);
					}}
					onMouseLeave={() => {
						setIsOpen(false);
					}}
					ref={referenceElement}
				>
					<Icon data={info_circle} color={tokens.colors.infographic.primary__moss_green_34.hex} />
					<Popover placement="bottom" open={isOpen} anchorEl={referenceElement.current}>
						<Popover.Content>Open menu and click on stars to add to favorites</Popover.Content>
					</Popover>
				</div>
			</styles.Heading>
			<Card.Content>
				<nav className={styles.cardList}>
					{hasFavorites ? (
						favorites.map((app) => {
							// const isDisabled = disabledAppKeys.includes(app.key);
							return (
								<FavoriteCard
									app={app}
									loading={isLoading}
									onClick={(a) => {
										addFavorite(a.key);
									}}
								/>
							);
						})
					) : (
						<div className={styles.noData}>
							<Icon
								data={info_circle}
								color={tokens.colors.infographic.primary__moss_green_34.hex}
								size={48}
							/>
							<Typography variant="h4" color={tokens.colors.text.static_icons__secondary.hex}>
								Open menu and click on stars to add to favorites
							</Typography>
						</div>
					)}
				</nav>
			</Card.Content>
		</div>
	);
};
