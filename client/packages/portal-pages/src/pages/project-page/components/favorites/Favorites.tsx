import { useTelemetry } from '@equinor/portal-core';
import { Card, Icon, Popover, Typography } from '@equinor/eds-core-react';

import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { Link } from 'react-router-dom';
import { info_circle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useRef, useState } from 'react';
import { useFavorites } from '../../hooks/use-favorites';

const AppIcon = styled.span<{ color: string | null | undefined }>`
	display: flex;
	width: 65px;
	height: 65px;
	background-color: ${({ color }) => (color ? color : tokens.colors.infographic.primary__moss_green_100.hex) + '33'};
	align-items: center;
	justify-content: center;
	border-radius: 3px;

	> svg {
		width: 2rem;
		height: 2rem;
		> path {
			fill: ${({ color }) => (color ? color : tokens.colors.infographic.primary__moss_green_100.hex)};
		}
		fill: ${({ color }) => (color ? color : tokens.colors.infographic.primary__moss_green_100.hex)};
	}
`;

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
		grid-auto-rows: 100px;
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
};

export const Favorites = () => {
	const referenceElement = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const { dispatchEvent } = useTelemetry();

	const { favorites, disabledAppKeys, hasFavorites } = useFavorites();

	return (
		<Card className={styles.fullHeight}>
			<Card.Header>
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
			</Card.Header>
			<Card.Content>
				<nav className={styles.cardList}>
					{hasFavorites ? (
						favorites.map((app) => {
							const isDisabled = disabledAppKeys.includes(app.key);
							return (
								<Link
									className={styles.appCard({ isDisabled, color: app.accentColor })}
									to={`/apps/${app.key}`}
									key={app.key}
									title={
										isDisabled
											? `${app.name} is not available for the selected context`
											: `Application button for the application ${app.name}`
									}
									onClick={(e) => {
										if (isDisabled) {
											e.preventDefault();
											return;
										}
										dispatchEvent(
											{
												name: 'onAppNavigation',
											},

											{ appKey: app.key, isFavorite: true, source: 'pinned-apps' }
										);
									}}
								>
									<aside>
										<AppIcon
											color={app.accentColor}
											dangerouslySetInnerHTML={{
												__html: app.icon || app.category?.defaultIcon || '<svg />',
											}}
										></AppIcon>
									</aside>
									<div>
										<Typography>{app.name}</Typography>
										<Typography variant="overline">{app.category?.name}</Typography>
									</div>
								</Link>
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
		</Card>
	);
};
