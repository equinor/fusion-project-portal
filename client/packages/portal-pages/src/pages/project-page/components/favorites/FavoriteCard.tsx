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
	Favorite: styled(Link)<{ loading?: boolean; disabled?: boolean }>`
		pointer-events: ${(props) => (props.loading ? 'none' : 'auto')};
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 0.25rem;
		box-sizing: border-box;
		border: ${(props) =>
			props.disabled ? `1.5px solid ${tokens.colors.interactive.disabled__border.hex}` : 'none'};

		box-shadow: ${(props) => (props.disabled ? 'none' : tokens.elevation.raised)};
		column-gap: ${tokens.spacings.comfortable.x_small};
		padding-right: 0.375rem;
		text-decoration: none;
		background-color: ${({ disabled }) => (disabled ? 'none' : tokens.colors.ui.background__default.hex)};

		cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

		div ${IconStyled.AppIcon} {
			height: auto;
		}
		> * {
			cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
		}

		&:hover,
		&:focus {
			&:after {
				content: '';
				width: 100%;
				height: 0.25rem;
				position: absolute;
				bottom: 0;
				left: 0;
				background-color: ${({ disabled }) =>
					disabled ? 'none' : `var(--app-color, ${tokens.colors.interactive.primary__resting.hex})`};
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
};

type FavoriteCardProps = {
	app: AppManifest;
	onClick: (app: AppManifest) => void;
	loading?: boolean;
	isDisabled: boolean;
	colorsStyle?: {
		[key: string]: string;
	};
};

export const FavoriteCard = ({ app, onClick, loading, isDisabled }: FavoriteCardProps): JSX.Element => {
	const appColor = app.category?.color || tokens.colors.interactive.primary__resting.hex;
	const appColors = {
		['--app-color' as any]: appColor,
		['--app-color-skeleton' as any]: appColor + '33',
	};

	return (
		<Styled.Favorite
			loading={loading}
			to={isDisabled ? '#' : `/apps/${app.key}/`}
			style={appColors}
			disabled={isDisabled}
			title={isDisabled ? `${app.name} is not available in the selected context` : app.name}
		>
			<Styled.Content>
				<AppIconContainer loading={loading} display="card" app={app} disabled={isDisabled} />
				<Styled.Details>
					<Typography
						group="paragraph"
						variant="body_short_bold"
						color={
							isDisabled
								? tokens.colors.interactive.disabled__text.hex
								: tokens.colors.text.static_icons__default.hex
						}
					>
						{loading ? <Skeleton size="small" variant="text" /> : app.name}
					</Typography>
					<Typography
						group="paragraph"
						variant="caption"
						color={
							isDisabled
								? tokens.colors.interactive.disabled__text.hex
								: tokens.colors.text.static_icons__default.hex
						}
					>
						{loading ? <Skeleton size="xSmall" variant="text" /> : app.category?.name}
					</Typography>
				</Styled.Details>
			</Styled.Content>
			<PinButtonContainer loading={loading} app={app} onClick={() => onClick(app)} disabled={isDisabled} />
		</Styled.Favorite>
	);
};

export default FavoriteCard;
