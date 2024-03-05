// import { useTelemetry } from '@equinor/portal-core';
import { Card, Icon, Popover, Typography } from '@equinor/eds-core-react';

import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { info_circle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useRef, useState } from 'react';
import { useFavorites, usePortalMenu } from '@portal/core';
import FavoriteCard from './FavoriteCard';
import { sortByCategoryAndIsDisabled } from './utils/utils';
import { AppContainerEmpty } from './AppContainerEmpty';

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
	FrameLink: styled.span`
		color: ${tokens.colors.interactive.primary__resting.hex};
		text-decoration: underline;
		cursor: pointer;
	`,
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
	NoData: styled.div`
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		grid-column: span 3;
		padding: 0 1rem;
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

type FavoriteProps = {
	openAllApps: () => void;
};

export const Favorites = ({ openAllApps }: FavoriteProps) => {
	const { toggleMenu } = usePortalMenu();
	const referenceElement = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	const { favorites, hasFavorites, isLoading, addFavorite, isDisabled } = useFavorites();

	return (
		<div>
			<styles.Heading>
				<Typography variant="h5">Favorites</Typography>
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
				{hasFavorites ? (
					<nav className={styles.cardList}>
						{sortByCategoryAndIsDisabled(favorites).map((app) => {
							return (
								<FavoriteCard
									key={app.key}
									app={app}
									isDisabled={isDisabled(app.key)}
									loading={isLoading}
									onClick={(a) => {
										addFavorite(a.key);
									}}
								/>
							);
						})}
					</nav>
				) : (
					<styles.NoData>
						<AppContainerEmpty>
							You don't have any favourite apps yet.
							<br />
							Choose your favourites in{' '}
							<styles.FrameLink onClick={openAllApps}>All apps</styles.FrameLink> or{' '}
							<styles.FrameLink
								onClick={() => {
									toggleMenu();
								}}
							>
								Menu
							</styles.FrameLink>{' '}
							by clicking on the star ★.
						</AppContainerEmpty>
					</styles.NoData>
				)}
			</Card.Content>
		</div>
	);
};
