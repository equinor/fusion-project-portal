import { useObservable } from '@equinor/portal-utils';
import { menuFavoritesController, useAppModule } from '@equinor/portal-core';
import { Card, Icon, Typography } from '@equinor/eds-core-react';

import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { combineLatest, map } from 'rxjs';
import { Link } from 'react-router-dom';
import { info_circle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

const AppIcon = styled.span<{ color: string | null | undefined }>`
	display: flex;
	width: 100px;
	height: 100px;
	background-color: ${({ color }) => (color ? color : '#52f6f8')};
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
	`,
	cardList: css`
		display: grid;
		grid-auto-rows: 100px;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		padding: 0;
	`,
	noData: css`
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		grid-column: span 3;
	`,
};

export const Favorites = () => {
	const { fusion } = useAppModule();
	const favorites = useObservable(
		combineLatest([fusion?.modules?.app?.getAllAppManifests(), menuFavoritesController.favorites$]).pipe(
			map(([apps, favorites]) => apps.filter((app) => favorites.includes(app.key)))
		)
	);

	return (
		<Card>
			<Card.Header>
				<Typography variant="h5">Favorites</Typography>
			</Card.Header>
			<Card.Content>
				<nav className={styles.cardList}>
					{favorites?.length ? (
						favorites.map((a) => (
							<Link className={styles.appCard} to={`/apps/${a.key}`}>
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
							<Typography variant="h4"> Open menu and add applications to favorites</Typography>
						</div>
					)}
				</nav>
			</Card.Content>
		</Card>
	);
};
