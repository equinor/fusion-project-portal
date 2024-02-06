import { Skeleton, SkeletonSize, SkeletonVariant } from '@equinor/fusion-react-skeleton';
import styled from 'styled-components';
import { Styled as FavoriteStyled } from './FavoriteCard';
import { tokens } from '@equinor/eds-tokens';
import { Link } from 'react-router-dom';

import AppIconContainer from './AppIcon';
import PinButtonContainer from './PinButton';
import { AppManifest } from '../types/types';
import { getAppCardColor } from '../util/app-card-color';

export const Styled = {
	Item: styled(Link)<{ $loading?: boolean; onDark?: boolean }>`
		pointer-events: ${(props) => (props.$loading ? 'none' : 'auto')};
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0.375rem 0.25rem;
		column-gap: ${tokens.spacings.comfortable.small};
		text-decoration: none;

		&:hover,
		&:focus {
			border-radius: 0.25rem;
			background: ${({ onDark }) =>
				onDark ? tokens.colors.ui.background__medium.hex : tokens.colors.ui.background__light.hex};
			cursor: ${(props) => (props.$loading ? 'default' : 'pointer')};
		}
	`,
	Content: styled(FavoriteStyled.Content)`
		column-gap: ${tokens.spacings.comfortable.medium_small};
	`,
	Name: styled(FavoriteStyled.Name)`
		flex: 1;
	`,
};

type ListCardProps = {
	app: Partial<AppManifest>;
	onClick?: (app: Partial<AppManifest>) => void;
	onFavorite?: (key: Partial<AppManifest>) => void;
	loading?: boolean;
	onDark?: boolean;
	pinButton?: boolean;
};

export const ListCard = ({ app, onClick, loading, pinButton, onDark, onFavorite }: ListCardProps): JSX.Element => {
	return (
		<Styled.Item
			$loading={loading}
			onDark={onDark}
			to={app.url || `/apps/${app.key}/`}
			style={getAppCardColor(app)}
			onClick={() => onClick && onClick(app)}
		>
			<Styled.Content>
				<AppIconContainer loading={loading} display="item" app={app} />
				<Styled.Name group="navigation" variant="menu_title">
					{loading ? <Skeleton size={SkeletonSize.small} variant={SkeletonVariant.Text} /> : app.name}
				</Styled.Name>
			</Styled.Content>
			{pinButton && <PinButtonContainer isLoading={loading} app={app} onFavorite={onFavorite} />}
		</Styled.Item>
	);
};

export default ListCard;
