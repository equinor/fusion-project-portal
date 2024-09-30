import styled, { css } from 'styled-components';

import { SkeletonSize, SkeletonVariant } from '@equinor/fusion-react-skeleton';
import { AppCardType } from '../../types/types';
import { defaultIcon } from './defaultIcon';
import { AppManifest } from '../../types/types';
import { AppIconSkeleton, primaryColor } from './IconSceleton';

export const Styles = {
	AppIcon: styled.div<{ $display: AppCardType }>`
		${({ $display }) => {
			switch ($display) {
				default:
				case 'item':
					return css`
						--app-icon-size: 1.5rem;
						--background-radius: 0.25rem;
						padding: 0.375rem;
					`;
				case 'card':
					return css`
						--app-icon-size: 1.5rem;a
						--background-radius: 0.25rem 0 0 0.25rem;
						padding: 0 0.375rem;
					`;
				case 'portal':
					return css`
						--app-icon-size: 2.5rem;
						--background-radius: 0.25rem 0 0 0.25rem;
						padding: 0 1.25rem;
					`;
			}
		}}
		align-self: normal;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--app-color, ${primaryColor});
		height: var(--app-icon-size, 1.5rem);
		width: var(--app-icon-size, 1.5rem);

		&:before {
			content: '';
			position: absolute;
			background-color: var(--app-color, ${primaryColor});
			border-radius: var(--background-radius, 0);
			height: 100%;
			width: 100%;
			opacity: 0.2;
		}
	`,
	AppIconSkeletonContainer: styled.div<{ $display: AppCardType }>`
		align-self: normal;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;

		${({ $display }) => {
			if ($display !== 'item') {
				return css`
					&:before {
						content: '';
						position: absolute;
						background-color: var(--app-color, ${primaryColor});
						border-radius: 0.25rem 0 0 0.25rem;
						height: 100%;
						width: 100%;
						opacity: 0.2;
					}
				`;
			}
			return '';
		}}
	`,
};

type AppIconProps = {
	app: Partial<AppManifest>;
	display: AppCardType;
	loading?: boolean;
};

export const AppIconContainer = ({ app, display, loading }: AppIconProps): JSX.Element => {
	const appCategoryIcon = app.category ? app.category.defaultIcon : defaultIcon;
	const appIcon = app.icon ? (app.icon !== '' ? app.icon : appCategoryIcon) : appCategoryIcon;

	if (loading) {
		return (
			<Styles.AppIconSkeletonContainer $display={display}>
				<AppIconSkeleton
					$display={display}
					size={display === 'card' ? SkeletonSize.XSmall : SkeletonSize.small}
					variant={SkeletonVariant.Square}
				/>
			</Styles.AppIconSkeletonContainer>
		);
	}

	return <Styles.AppIcon $display={display} dangerouslySetInnerHTML={{ __html: appIcon || defaultIcon }} />;
};

export default AppIconContainer;
