/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Link } from 'react-router-dom';
import { Typography } from '@equinor/eds-core-react';

import AppIconContainer, { Styled as IconStyled } from './AppIcon';
import PinButtonContainer from './PinButton';

import { AppManifest } from '@equinor/fusion-framework-module-app';
import { Skeleton } from '@portal/ui';

export const Styled = {
	Favorite: styled(Link)<{ $loading?: boolean }>`
		pointer-events: ${(props) => (props.$loading ? 'none' : 'auto')};
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 0.25rem;
		box-shadow: ${tokens.elevation.raised};
		column-gap: ${tokens.spacings.comfortable.x_small};
		padding-right: 0.375rem;
		text-decoration: none;
		background-color: #fff;

		div ${IconStyled.AppIcon} {
			height: auto;
		}

		&:hover,
		&:focus {
			cursor: ${(props) => (props.$loading ? 'default' : 'pointer')};
			&:after {
				content: '';
				width: 100%;
				height: 0.25rem;
				position: absolute;
				bottom: 0;
				left: 0;
				background-color: var(--app-color, ${tokens.colors.interactive.primary__resting.hex});
				border-radius: 0 0 0.25rem 0.25rem;
				opacity: 0.3;
			}
		}
	`,
	Content: styled.div`
		height: 100%;
		display: flex;
		flex: 1;
		align-items: center;
		column-gap: ${tokens.spacings.comfortable.small};
	`,
	Details: styled.div`
		display: flex;
		flex-direction: column;
		row-gap: ${tokens.spacings.comfortable.xx_small};
		padding: ${tokens.spacings.comfortable.medium_small} 0;
	`,
	Name: styled(Typography)`
		color: ${tokens.colors.text.static_icons__default.hex};
	`,
	Category: styled(Typography)`
		color: ${tokens.colors.text.static_icons__tertiary.hex};
	`,
};

type FavoriteCardProps = {
	app: AppManifest;
	onClick: (app: AppManifest) => void;
	loading?: boolean;
	colorsStyle?: {
		[key: string]: string;
	};
};

export const FavoriteCard = ({ app, onClick, loading }: FavoriteCardProps): JSX.Element => {
	const appColor = app.category?.color || tokens.colors.interactive.primary__resting.hex;
	const appColors = {
		['--app-color' as any]: appColor,
		['--app-color-skeleton' as any]: appColor + '33',
	};

	return (
		<Styled.Favorite $loading={loading} to={`/apps/${app.key}/`} style={appColors}>
			<Styled.Content>
				<AppIconContainer loading={loading} display="card" app={app} />
				<Styled.Details>
					<Styled.Name group="paragraph" variant="body_short_bold">
						{loading ? <Skeleton size="small" variant="text" /> : app.name}
					</Styled.Name>
					<Styled.Category group="paragraph" variant="caption">
						{loading ? <Skeleton size="xSmall" variant="text" /> : app.category?.name}
					</Styled.Category>
				</Styled.Details>
			</Styled.Content>
			<PinButtonContainer loading={loading} app={app} onClick={() => onClick(app)} />
		</Styled.Favorite>
	);
};

export default FavoriteCard;
