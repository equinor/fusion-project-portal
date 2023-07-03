import { useObservable } from '@equinor/portal-utils';
import { menuFavoritesController, useAppModule, useTelemetry } from '@equinor/portal-core';
import { Card, Icon, Popover, Typography } from '@equinor/eds-core-react';

import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { combineLatest, map } from 'rxjs';
import { Link } from 'react-router-dom';
import { info_circle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useMemo, useRef, useState } from 'react';

const AppIcon = styled.span<{ color: string | null | undefined }>`
	display: flex;
	width: 100px;
	height: 100px;
	background-color: ${({ color }) => (color ? color : tokens.colors.infographic.primary__moss_green_100.hex)};
	align-items: center;
	justify-content: center;
	border-radius: 3px;

	> svg {
		> path {
			fill: #fff;
		}
		fill: #fff;
	}
`;

const styles = {
	appCard: css`
		display: flex;
		flex-direction: row;
		gap: 1rem;
		cursor: pointer;
		overflow: hidden;
		text-decoration: none;
		:hover {
			opacity: 0.9;
		}
	`,
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
	const { fusion } = useAppModule();
	const { dispatchEvent } = useTelemetry();

	const favorite$ = useMemo(
		() =>
			combineLatest([fusion?.modules?.app?.getAllAppManifests(), menuFavoritesController.favorites$]).pipe(
				map(([apps, favorites]) => apps.filter((app) => favorites.includes(app.key)))
			),
		[fusion.modules.app.getAllAppManifests]
	);

	const favorites = useObservable(favorite$);

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
					{favorites?.length ? (
						favorites.map((a) => (
							<Link
								className={styles.appCard}
								to={`/apps/${a.key}`}
								key={a.key}
								onClick={() => {
									dispatchEvent(
										{
											name: 'onAppNavigation',
										},

										{ appKey: a.key, isFavorite: true, source: 'pinned-apps' }
									);
								}}
							>
								<aside>
									<AppIcon
										color={a.accentColor}
										dangerouslySetInnerHTML={{
											__html: a.icon || a.category?.defaultIcon || '<svg />',
										}}
									></AppIcon>
								</aside>
								<div>
									<Typography>{a.name}</Typography>
									<Typography variant="overline">{a.category?.name}</Typography>
									<Typography>{a.description}</Typography>
								</div>
							</Link>
						))
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
